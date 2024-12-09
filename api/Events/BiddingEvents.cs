using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Events
{


    public record NewBiddingEvent(string AuctionTitle, decimal BidAmount, string SellerId, List<string> Watchers);


}