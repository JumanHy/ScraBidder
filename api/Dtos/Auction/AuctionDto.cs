using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.BiddingHistory;
using api.Models;

namespace api.Dtos.Auction
{
    public class AuctionDto
    {
        public int AuctionId { get; set; }
        public string Title { get; set; }
        public decimal? CurrentBid { get; set; }
        public List<BidDto> bidDtos { get; set; }
        public string seller { get; set; }
        public string category {get;set;}
    }
}