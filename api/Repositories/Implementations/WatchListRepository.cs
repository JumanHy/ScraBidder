using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Implementations
{
    public class WatchListRepository : IWatchListRepository
    {
        private readonly ApplicationDBContext _dbContext;

        public WatchListRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<WatchList> AddAsync(WatchList watchList)
        {
            if (watchList == null) throw new ArgumentNullException(nameof(watchList));

            _dbContext.WatchList.Add(watchList);
            await _dbContext.SaveChangesAsync();
            return watchList;
        }


        public async Task<WatchList> DeleteAsync(WatchList watchList)
        {
            if (watchList == null) throw new ArgumentNullException(nameof(watchList));

            _dbContext.WatchList.Remove(watchList);
            await _dbContext.SaveChangesAsync();
            return watchList;
        }


        public async Task<List<WatchList>> GetWatchListByUserIdAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId)) throw new ArgumentNullException(nameof(userId));

            return await _dbContext.WatchList
                .Include(w => w.Auction)
                .ThenInclude(A => A.Category)
                .Include(w => w.User) // Include related data, if any
                .Where(w => w.UserId == userId)
                .ToListAsync();
        }

        public async Task<WatchList?> GetSingleWatchListAsync(string userId, int auctionId)
        {
            if (string.IsNullOrEmpty(userId)) throw new ArgumentNullException(nameof(userId));

            return await _dbContext.WatchList
                .Include(w => w.Auction)
                .ThenInclude(A => A.Category)
                .Include(w => w.User) // Include related data, if any
                .FirstOrDefaultAsync(w => w.UserId == userId && w.AuctionId == auctionId);


        }
        public async Task<List<WatchList>> GetAllWatchListAsync()
        {
            return await _dbContext.WatchList
                .Include(w => w.Auction)
                .ThenInclude(A => A.Category)
                .Include(w => w.User)    // Include related User data if needed
                .ToListAsync();
        }
        public async Task<WatchList?> GetWatchListAsync(WatchList watchList)
        {
            if (watchList == null) throw new ArgumentNullException(nameof(watchList));

            return await _dbContext.WatchList
                .Include(w => w.Auction)
                .ThenInclude(A => A.Category)
                .Include(w => w.User)
                .FirstOrDefaultAsync(w => w.UserId == watchList.UserId && w.AuctionId == watchList.AuctionId);
        }


    }
}