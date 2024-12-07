using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.WatchList
{
    public class WatchListAddDeleteRequestDto
    {
        public int WatchId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public int AuctionId { get; set; }
    }
}