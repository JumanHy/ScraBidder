using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Auction
{
    public class AuctionBiddingDto
    {
        public string BidderId { get; set; }
        public string Username { get; set; }
        public int BidId { get; set; }
        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }
    }
}