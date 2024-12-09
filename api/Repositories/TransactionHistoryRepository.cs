using System;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class TransactionHistoryRepository : ITransactionHistoryRepository
    {
        private readonly EventDispatcher _eventDispatcher;
        private readonly ApplicationDBContext _context;

        public TransactionHistoryRepository(ApplicationDBContext context, EventDispatcher eventDispatcher)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
        }

        public async Task<List<TransactionHistory>> GetTransactionsAsync(
            string? transactionId = null,
            string? relatedId = null,
            string? userId = null,
            int? auctionId = null,
            TransactionPurpose? purpose = null,
            TransactionType? type = null,
            string? status = null)
        {
            // Start with the base query
            var query = _context.TransactionHistory.AsQueryable();

            if (!string.IsNullOrEmpty(relatedId))
                query = query.Where(t => t.RelatedId == relatedId);

            if (!string.IsNullOrEmpty(transactionId))
                query = query.Where(t => t.TransactionId == transactionId);

            if (!string.IsNullOrEmpty(userId))
                query = query.Where(t => t.UserId == userId);

            if (auctionId.HasValue)
                query = query.Where(t => t.AuctionId == auctionId.Value);

            if (purpose.HasValue)
                query = query.Where(t => t.TransactionPurpose == purpose.Value);

            if (type.HasValue)
                query = query.Where(t => t.TransactionType == type.Value);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(t => t.Status == status);

            // Execute the query and return the result
            return await query.ToListAsync();
        }


        public async Task AddAsync(TransactionHistory transaction)
        {
            await _context.TransactionHistory.AddAsync(transaction);
            await _context.SaveChangesAsync();
            if (transaction.TransactionType != TransactionType.Order)
            {
                var auctionEvent = new TransactionEvent(transaction.AuctionId, transaction.UserId, transaction.TransactionPurpose, transaction.TransactionType);

                await _eventDispatcher.Dispatch(auctionEvent);
            }
        }

        public async Task<List<TransactionHistory?>> GetAuthorizedTransactionsForVoidAsync()
        {
            var transactions = await _context.TransactionHistory
                .OrderByDescending(t => t.CreatedAt) // Order by most recent transactions first
                .Where(t => t.TransactionPurpose == TransactionPurpose.Deposit &&
                            t.Auction.AuctionStatus == AuctionStatus.Ended) // Filter criteria
                .GroupBy(t => new { t.UserId }) // Group by user and auction
                .Select(g => g.FirstOrDefault())

                .ToListAsync();

            var filteredTransactions = transactions
                .Where(t => t.TransactionType == TransactionType.Authorization)
                .ToList();

            return filteredTransactions;
        }

        public async Task<List<AuthorizedTransactionResultForCapturing>> GetAuthorizedTransactionsForCapturingAsync()
        {
            var transactions = await _context.TransactionHistory
                .OrderByDescending(t => t.CreatedAt) // Order by latest
                .Select(t => new AuthorizedTransactionResultForCapturing
                {
                    Transaction = t,
                    Auction = t.Auction, // Include the related auction
                    WinningBid = t.Auction.Biddings
                        .Where(b => b.BidAmount == t.Auction.CurrentBid) // Highest bid matching the current bid
                        .OrderByDescending(b => b.BidAmount) // Ensure it's the highest
                        .ThenBy(b => b.BidTime) // Tie-breaker: earliest bid
                        .FirstOrDefault(),
                    LatestShipment = t.Auction.Shipments
                        .OrderByDescending(s => s.CreatedAt) // Latest shipment
                        .FirstOrDefault()
                })
                .Where(result =>
                             result.Auction != null && // Ensure auction exists
                             result.Auction.AuctionStatus == AuctionStatus.Ended && // Ensure the auction has ended
                             result.Auction.CurrentBid >= (result.Auction.ReservePrice ?? 0) // Ensure there's a winner
                )
                .ToListAsync();
            var authorizedTransactions = transactions
                .Where(t => t.Transaction.TransactionType == TransactionType.Authorization)
                .ToList();
            return authorizedTransactions;
        }

        public async Task<List<TransactionHistory>> GetTransactionHistoryByUserIdAsync(string userId)
        {


            var transactionsModel = await _context.TransactionHistory
                                            .Include(t => t.Auction)
                                            .Where(t => t.UserId == userId)
                                            .OrderByDescending(t => t.CreatedAt)
                                            .ToListAsync();

            return transactionsModel;

        }
    }
}
