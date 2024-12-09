using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.WatchList
{
    public class WatchListResponeDto
    {
        public int WatchId { get; set; }
        public UserDto User { get; set; }

        public AuctionDto Auction { get; set; }
    }
}