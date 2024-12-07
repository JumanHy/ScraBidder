using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Dtos.WatchList;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repositories.Interface;

namespace api.Services
{
    public class WatchListService
    {

        private readonly IWatchListRepository _watchListRepository;
        private readonly IAuctionRepository _auctionRepository;

        public WatchListService(IWatchListRepository watchListRepository, IAuctionRepository auctionRepository)
        {
            _watchListRepository = watchListRepository;
            _auctionRepository = auctionRepository;
        }

        // Add a watchlist
        public async Task<WatchListResponeDto> AddWatchListAsync(int auctionId, string? userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException("User Id is null");
            }
            var auctionExistance = await _auctionRepository.GetAuctionByIdAsync(auctionId);
            if (auctionExistance == null)
            {
                throw new ArgumentNullException("Invalid Auction Id");
            }

            var newWatchList = new WatchList
            {
                AuctionId = auctionId,
                UserId = userId,

            };

            // Prevent duplicate entries for the same user and auction
            var existingWatchList = await _watchListRepository.GetWatchListAsync(newWatchList);
            if (existingWatchList != null)
                throw new InvalidOperationException("This auction is already in the user's watchlist.");

            var addedWatchList = await _watchListRepository.AddAsync(newWatchList);


            return addedWatchList.ToWatchListResponseDto();
        }

        // Remove a watchlist
        public async Task<WatchListResponeDto> RemoveWatchListAsync(int auctionId, string? userId)
        {
            if (userId == null)
            {
                throw new ArgumentNullException("User Id is null");
            }

            var newWatchList = new WatchList
            {
                AuctionId = auctionId,
                UserId = userId,
            };

            // Ensure the item exists before attempting to delete
            var existingWatchList = await _watchListRepository.GetWatchListAsync(newWatchList);
            if (existingWatchList == null)
                throw new KeyNotFoundException("The specified watchlist entry does not exist.");

            var removedWatchList = await _watchListRepository.DeleteAsync(existingWatchList);

            return removedWatchList.ToWatchListResponseDto();
        }
        // Get single watched auction for a user
        public async Task<WatchListResponeDto> GetUserWatchListAsync(string userId, int auctionId)
        {
            if (string.IsNullOrEmpty(userId))
                throw new ArgumentNullException(nameof(userId), "UserId cannot be null or empty.");

            var watchList = await _watchListRepository.GetSingleWatchListAsync(userId, auctionId);

            if (watchList == null)
                throw new InvalidOperationException("It does not exist in the user's watch list.");

            return watchList.ToWatchListResponseDto();
        }

        // Get all watchlists for a user
        public async Task<List<WatchListResponeDto>> GetUserWatchListsAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                throw new ArgumentNullException(nameof(userId), "UserId cannot be null or empty.");

            var watchLists = await _watchListRepository.GetWatchListByUserIdAsync(userId);

            return watchLists.Select(watchList => watchList.ToWatchListResponseDto()).ToList();
        }

        // Get all watchlists (for admin or general use)
        public async Task<List<WatchListResponeDto>> GetAllWatchListsAsync()
        {
            var watchLists = await _watchListRepository.GetAllWatchListAsync();

            return watchLists.Select(watchList => watchList.ToWatchListResponseDto()).ToList();
        }
    }
}
