using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Auction;
using api.Enums;

namespace api.Dtos.WatchList
{
    public class AuctionDto
    {
        public int AuctionId { get; set; }


        public string Title { get; set; }

        public string Description { get; set; }


        public AuctionStatus AuctionStatus { get; set; } // Enum: pending, approved, denied, started, ended


        public decimal StartingBid { get; set; }


        public decimal? CurrentBid { get; set; }


        public decimal? ReservePrice { get; set; }

        public DateTime CreatedAt { get; set; }


        public DateTime StartingTime { get; set; }


        public DateTime EndingTime { get; set; }


        public CategoryDto Category { get; set; }



    }
}
