using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Auction
{
    public class UpdateAuctionDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public string Images { get; set; } // JSON
        public AuctionStatus AuctionStatus { get; set; } // Enum: pending, approved, denied, started, ended
        public decimal StartingBid { get; set; }
        public decimal? ReservePrice { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime EndingTime { get; set; }
        public string Address { get; set; } // JSON
        public Condition Condition { get; set; } // Enum: new, used, mixed
        public decimal Quantity { get; set; }
    }
}