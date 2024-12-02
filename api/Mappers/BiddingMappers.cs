using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Dtos.BiddingHistory;
namespace api.Mappers
{
    public static class BiddingMappers
    {
        public static BidDto ToBidDto(this BiddingHistory bidModel)
        {
            return new BidDto
            {
                BidId = bidModel.BidId,
                BidAmount = bidModel.BidAmount,
                BidTime = bidModel.BidTime,
                Bidder = new BidderDto
                {
                    BidderId = bidModel.BidderId,
                },
                Auction = new AuctionDto
                {
                    AuctionId = bidModel.AuctionId,
                    Title = bidModel.Auction.Title,
                }

            };

        }

        public static BiddingHistory ToBidFromCreateDto(this CreateBidDto createBidDto)
        {
            return new BiddingHistory
            {
                AuctionId = createBidDto.AuctionId,
                BidderId = createBidDto.BidderId,
                BidAmount = createBidDto.BidAmount,
                BidTime = DateTime.UtcNow
            };
        }
    }
}