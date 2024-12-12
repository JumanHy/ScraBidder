using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Auction;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IAuctionRepository
    {
        Task<List<Auction>> GetAllAuctionsAsync(QueryObject query);
        Task<List<Auction>> GetAllAuctionsForAdminAsync(QueryObject query);
        Task<Auction?> GetAuctionByIdAsync(int id);
        Task<Auction> CreateAuctionAsync(Auction auction);
        Task<Auction?> UpdateAuctionAsync(int id, UpdateAuctionDto updatedt);
        Task<Auction?> DeleteAuctionAsync(int id);

        Task<List<Auction>> GetAuctionsByUserIdAsync(string userId);
    }
}