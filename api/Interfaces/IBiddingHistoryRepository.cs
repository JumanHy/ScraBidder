using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Interfaces
{
    public interface IBiddingHistoryRepository
    {
        Task<List<BiddingHistory>> GetAllAsync();
        Task<BiddingHistory> CreateBidAsync(BiddingHistory bid);
        Task<BiddingHistory?> GetByIdAsync(int id);

    }
}