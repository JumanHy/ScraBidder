using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BiddingHistoryRepository : IBiddingHistoryRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly EventDispatcher _eventDispatcher;


        public BiddingHistoryRepository(ApplicationDBContext context, EventDispatcher eventDispatcher)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
        }
        public async Task<BiddingHistory> CreateBidAsync(BiddingHistory bid)
        {
            var auction = _context.Auctions.Include(A => A.Biddings).Include(A => A.watches).FirstOrDefault(a => a.AuctionId == bid.AuctionId);

            if (auction.AuctionStatus != AuctionStatus.Started)
            {
                return null;
            }

            else if (bid.BidTime >= auction.EndingTime || bid.BidTime < auction.StartingTime)
            {
                return null;
            }

            else if (bid.BidAmount < auction.StartingBid || bid.BidAmount < auction.CurrentBid)
            {
                return null;
            }
            var bidder = await _context.Users.FirstOrDefaultAsync(u => u.Id == bid.BidderId);

            if (bidder == null)
            {
                return null;
            }
            bid.Bidder = bidder;
            auction.CurrentBid = bid.BidAmount;

            await _context.BiddingHistory.AddAsync(bid);
            await _context.SaveChangesAsync();
            var watchersIds = new List<string>();

            foreach (var watcher in auction.watches)
            {
                watchersIds.Add(watcher.UserId);
            }
            var NewBidding = new NewBiddingEvent(auction.Title, bid.BidAmount, auction.SellerId, watchersIds);
            await _eventDispatcher.Dispatch(NewBidding);

            return bid;
        }

        public async Task<List<BiddingHistory>> GetAllAsync()
        {
            return await _context.BiddingHistory.Include(b => b.Bidder).Include(b => b.Auction).ToListAsync();
        }

        public async Task<BiddingHistory?> GetByIdAsync(int id)
        {
            return await _context.BiddingHistory.Include(b => b.Bidder).Include(b => b.Auction).FirstOrDefaultAsync(b => b.BidId == id);
        }
    }
}