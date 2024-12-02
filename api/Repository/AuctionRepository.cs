using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Auction;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AuctionRepository : IAuctionRepository
    {
        private readonly ApplicationDBContext _context;
        public AuctionRepository(ApplicationDBContext context)
        {
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
            var auctionModel = await _context.Auctions.FirstOrDefaultAsync(x => x.AuctionId == id);
            if (auctionModel == null)
            {
                return null;
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
            return auctionModel;
        }
    }
}