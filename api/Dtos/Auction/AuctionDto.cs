using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BiddingHistory;
using api.Enums;
using api.Models;

namespace api.Dtos.Auction
{
    public class AuctionDto
    {

        public int AuctionId { get; set; }


        public string Title { get; set; }

        public string Description { get; set; }


        public string Images { get; set; } = string.Empty; // JSON


        public AuctionStatus AuctionStatus { get; set; } // Enum: pending, approved, denied, started, ended


        public decimal StartingBid { get; set; }


        public decimal? CurrentBid { get; set; }


        public decimal? ReservePrice { get; set; }

        public DateTime CreatedAt { get; set; }


        public DateTime StartingTime { get; set; }


        public DateTime EndingTime { get; set; }

        public string Address { get; set; } // JSON


        public Condition Condition { get; set; } // Enum: new, used, mixed


        public decimal Quantity { get; set; }

        public SellerDto Seller { get; set; }
        public CategoryDto Category { get; set; }

        public List<AuctionBiddingDto> Biddings { get; set; } = new List<AuctionBiddingDto>();

    }
}