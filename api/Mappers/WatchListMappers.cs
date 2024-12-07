using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.WatchList;
using api.Dtos.Auction;

using api.Models;

namespace api.Mappers
{
    public static class WatchListMappers
    {
        public static WatchListResponeDto ToWatchListResponseDto(this WatchList watchList)
        {

            return new WatchListResponeDto
            {
                WatchId = watchList.WatchId,
                User = new UserDto
                {
                    UserId = watchList.UserId,
                },
                Auction = new Dtos.WatchList.AuctionDto
                {
                    AuctionId = watchList.AuctionId,
                    Title = watchList.Auction.Title,
                    Description = watchList.Auction.Description,
                    AuctionStatus = watchList.Auction.AuctionStatus,
                    StartingBid = watchList.Auction.StartingBid,
                    CurrentBid = watchList.Auction.CurrentBid,
                    ReservePrice = watchList.Auction.ReservePrice,
                    CreatedAt = watchList.Auction.CreatedAt,
                    StartingTime = watchList.Auction.StartingTime,
                    EndingTime = watchList.Auction.EndingTime,
                    Category = new CategoryDto
                    {
                        CategoryId = watchList.Auction.Category.CategoryId,
                        CategoryName = watchList.Auction.Category.CategoryName
                    }
                }
            };
        }


        public static WatchList ToWatchListFromRequestDto(this WatchListAddDeleteRequestDto watchListDto)
        {
            return new WatchList
            {
                WatchId = watchListDto.WatchId,
                UserId = watchListDto.UserId,
                AuctionId = watchListDto.AuctionId
            };
        }

        // Convert a list of WatchList models to a list of WatchListResponseDto
        public static List<WatchListResponeDto> ToWatchListResponseDtoList(this IEnumerable<WatchList> watchLists)
        {
            return watchLists.Select(watchList => watchList.ToWatchListResponseDto()).ToList();
        }
    }
}
