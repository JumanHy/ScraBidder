using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums;
using api.Events;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BiddingHistoryRepository : IBiddingHistoryRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly EventDispatcher _eventDispatcher;
        private readonly IAuctionRepository _auctionRepository;
        private readonly IHubContext<BiddingHub> _hubContext;
        public BiddingHistoryRepository(ApplicationDBContext context, EventDispatcher eventDispatcher, IHubContext<BiddingHub> hubContext, IAuctionRepository auctionRepository)
        {
            _context = context;
            _eventDispatcher = eventDispatcher;
            _hubContext = hubContext;
            _auctionRepository = auctionRepository;
        }

        public async Task<BiddingHistory> CreateBidAsync(BiddingHistory bid)
        {
            var auction = await _auctionRepository.GetAuctionByIdAsync(bid.AuctionId);


            if (bid.BidAmount < auction.StartingBid || bid.BidAmount < auction.CurrentBid)
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

            var auctionDto = auction.ToAuctionDto();
            var biddings = auctionDto.Biddings;
            await _hubContext.Clients.All.SendAsync("ReceiveBidUpdate", bid.AuctionId, bid.BidAmount, biddings);
            return bid;
        }

        public async Task<List<BiddingHistory>> GetAllAsync()
        {
            return await _context.BiddingHistory.Include(b => b.Bidder).ThenInclude(B => B.Business)
                                                .Include(b => b.Bidder).ThenInclude(B => B.Individual)
                                                .Include(b => b.Auction).ToListAsync();
        }

        public async Task<BiddingHistory?> GetByIdAsync(int id)
        {
            return await _context.BiddingHistory.Include(b => b.Bidder).Include(b => b.Auction).FirstOrDefaultAsync(b => b.BidId == id);
        }
    }
}