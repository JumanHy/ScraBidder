using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.BiddingHistory
{
    public class BidDto
    {
        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }
    }
}