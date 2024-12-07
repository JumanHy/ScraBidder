using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Auction;
using api.Dtos.Notification;
using api.Enums;
using api.Events;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AuctionRepository : IAuctionRepository
    {

        private readonly EventDispatcher _eventDispatcher;
        private readonly ApplicationDBContext _context;
        public AuctionRepository(ApplicationDBContext context, EventDispatcher eventDispatcher)
        {

            _eventDispatcher = eventDispatcher;
            _context = context;
        }

        public async Task<Auction> CreateAuctionAsync(Auction auction)
        {
            await _context.Auctions.AddAsync(auction);
            await _context.SaveChangesAsync();
            return auction;
        }

        public async Task<Auction?> DeleteAuctionAsync(int id)
        {
            var auction = await _context.Auctions.FirstOrDefaultAsync(x => x.AuctionId == id);
            if (auction == null)
            {
                return null;
            }
            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
            return auction;
        }

        public async Task<List<Auction>> GetAllAuctionsAsync(QueryObject query)
        {
            var result = _context.Auctions.Include(a => a.Biddings).ThenInclude(b => b.Bidder).ThenInclude(b => b.Business)
                                            .Include(a => a.Biddings).ThenInclude(b => b.Bidder).ThenInclude(b => b.Individual)
                                            .Include(a => a.Seller).ThenInclude(s => s.Business).Include(a => a.Category).AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Category))
            {
                result = result.Where(x => x.Category.CategoryName.Contains(query.Category));
            }
            if (query.Status != null)
            {
                result = result.Where(x => x.AuctionStatus == query.Status);
            }
            return await result.ToListAsync();
        }

        public async Task<Auction?> GetAuctionByIdAsync(int id)
        {
            return await _context.Auctions.Include(a => a.Biddings).ThenInclude(b => b.Bidder).ThenInclude(b => b.Business)
                                            .Include(a => a.Biddings).ThenInclude(b => b.Bidder).ThenInclude(b => b.Individual)
                                            .Include(a => a.Seller).ThenInclude(s => s.Business).Include(a => a.Category)
                                            .FirstOrDefaultAsync(i => i.AuctionId == id);
        }

        public async Task<Auction?> UpdateAuctionAsync(int id, UpdateAuctionDto updatedto)
        {
            var auctionModel = await _context.Auctions.Include(A => A.watches).Include(A => A.Biddings).FirstOrDefaultAsync(x => x.AuctionId == id);
            if (auctionModel == null)
            {
                return null;
            }
            var approvedOrDenied = false;
            var startedOrEnded = false;
            if (auctionModel.AuctionStatus != updatedto.AuctionStatus)
            {
                approvedOrDenied = (updatedto.AuctionStatus == AuctionStatus.Approved) || (updatedto.AuctionStatus == AuctionStatus.Denied);
            }
            if (auctionModel.AuctionStatus != updatedto.AuctionStatus)
            {

                startedOrEnded = (updatedto.AuctionStatus == AuctionStatus.Started) || (updatedto.AuctionStatus == AuctionStatus.Ended);
            }

            auctionModel.Title = updatedto.Title;
            auctionModel.Description = updatedto.Description;
            auctionModel.CategoryId = updatedto.CategoryId;
            auctionModel.Images = updatedto.Images;
            auctionModel.AuctionStatus = updatedto.AuctionStatus;
            auctionModel.StartingBid = updatedto.StartingBid;
            auctionModel.ReservePrice = updatedto.ReservePrice;
            auctionModel.StartingTime = updatedto.StartingTime;
            auctionModel.EndingTime = updatedto.EndingTime;
            auctionModel.Address = updatedto.Address;
            auctionModel.Condition = updatedto.Condition;
            auctionModel.Quantity = updatedto.Quantity;
            await _context.SaveChangesAsync();
            var watcherIds = auctionModel.watches.Select(w => w.UserId).ToList();

            if (approvedOrDenied)
            {
                var auctionEvent = new AuctionStatusChangedEvent(auctionModel.AuctionId, auctionModel.Title, auctionModel.SellerId, updatedto.AuctionStatus);
                // Dispatch the event to handlers
                await _eventDispatcher.Dispatch(auctionEvent);
            }

            if (startedOrEnded)
            {
                if (updatedto.AuctionStatus == AuctionStatus.Started)
                {
                    var auctionStartedEvent = new AuctionStartedEvent(
                        auctionModel.AuctionId,
                        auctionModel.Title,
                        auctionModel.SellerId,
                        watcherIds
                    );
                    await _eventDispatcher.Dispatch(auctionStartedEvent);
                }
                else if (updatedto.AuctionStatus == AuctionStatus.Ended)
                {
                    // Determine the winner ID
                    var winningBid = auctionModel.Biddings
                        .Where(b => b.BidAmount >= (auctionModel.ReservePrice ?? 0))
                        .OrderByDescending(b => b.BidAmount)
                        .ThenBy(b => b.BidTime) // Tie-breaker: earliest bid
                        .FirstOrDefault();

                    var winnerId = winningBid?.BidderId;

                    var auctionEndedEvent = new AuctionEndedEvent(
                        auctionModel.AuctionId,
                        auctionModel.Title,
                        auctionModel.SellerId,
                        watcherIds,
                        winnerId
                    );
                    await _eventDispatcher.Dispatch(auctionEndedEvent);
                }
            }
            return auctionModel;
        }
    }
}