using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.Auction
{
    public class AuctionsResponseForSeller
    {
        public int AuctionId { get; set; }
        public string SellerId { get; set; }
        public string Title { get; set; }
        public AuctionStatus AuctionStatus { get; set; }

        public decimal? CurrentBid { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime StartingTime { get; set; }
        public DateTime EndingTime { get; set; }
        public CategoryDto Category { get; set; }
        public int Watchers { get; set; } = 0;
    }
}