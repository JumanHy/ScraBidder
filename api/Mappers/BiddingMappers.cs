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
                BidAmount=bidModel.BidAmount,
                BidTime=bidModel.BidTime
            };
        }

        public static BiddingHistory ToBidFromCreateDto(this CreateBidDto createBidDto)
        {
            return new BiddingHistory{
                AuctionId=createBidDto.AuctionId,
                BidderId=createBidDto.BidderId,
                BidAmount=createBidDto.BidAmount,
                BidTime=DateTime.Now
            };
        }
    }
}