using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Interface
{
    public interface IWatchListRepository
    {
        //AddToWatchList (userId, auctionId)
        Task<WatchList> AddAsync(WatchList WatchList);

        Task<WatchList> DeleteAsync(WatchList WatchList);

        Task<List<WatchList>> GetAllWatchListAsync();
        Task<List<WatchList>> GetWatchListByUserIdAsync(string userId);
        Task<WatchList?> GetWatchListAsync(WatchList watchList);
        Task<WatchList?> GetSingleWatchListAsync(string userId, int auctionId);

    }
}