using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos
{
    public class AuthorizedTransactionResultForCapturing
    {
        public Models.TransactionHistory Transaction { get; set; }
        public Models.Auction Auction { get; set; }
        public Models.BiddingHistory? WinningBid { get; set; }
        public Models.Shipment? LatestShipment { get; set; }
    }
}