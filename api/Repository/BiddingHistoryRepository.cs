using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BiddingHistoryRepository : IBiddingHistoryRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IHubContext<BiddingHub> _hubContext;
        public BiddingHistoryRepository(ApplicationDBContext context, IHubContext<BiddingHub> hubContext)
        {
<<<<<<< Updated upstream
            _context=context;
        }
        public async Task<BiddingHistory> CreateBidAsync(BiddingHistory bid)
        {
            var auction=_context.Auctions.FirstOrDefault(a=>a.AuctionId==bid.AuctionId);

            if(auction.AuctionStatus!="Active")
            {
                return null;
            }

            else if(bid.BidTime>=auction.EndingTime || bid.BidTime<auction.StartingTime)
            {
                return null;
            }

            else if(bid.BidAmount<auction.StartingBid || bid.BidAmount<auction.CurrentBid)
=======
            _context = context;
            _hubContext = hubContext;
        }
        public async Task<BiddingHistory> CreateBidAsync(BiddingHistory bid)
        {
            var auction = await _context.Auctions
                .Include(a => a.Biddings)
                .FirstOrDefaultAsync(a => a.AuctionId == bid.AuctionId);


            if (bid.BidAmount < auction.StartingBid || bid.BidAmount < auction.CurrentBid)
>>>>>>> Stashed changes
            {
                return null;
            }
            var bidder = await _context.Users.FirstOrDefaultAsync(u => u.UserId == bid.BidderId);

            if (bidder == null)
            {
                return null;
            }
            bid.Bidder= bidder;
            auction.CurrentBid = bid.BidAmount;
            
            await _context.BiddingHistory.AddAsync(bid);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("ReceiveBidUpdate", bid.AuctionId, bid.BidAmount, auction.Biddings);
            return bid;
        }

        public async Task<List<BiddingHistory>> GetAllAsync()
        {
            return await _context.BiddingHistory.Include(b=>b.Bidder).ToListAsync();
        }

        public async Task<BiddingHistory?> GetByIdAsync(int id)
        {
            return await _context.BiddingHistory.FindAsync(id);
        }
    }
}