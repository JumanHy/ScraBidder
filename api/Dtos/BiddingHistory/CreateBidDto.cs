using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.BiddingHistory
{
    public class CreateBidDto
    {
        public int AuctionId { get; set; }
        public int BidderId { get; set; }
        public decimal BidAmount { get; set; }
    }
}