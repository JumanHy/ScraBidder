using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Helpers
{
    public class QueryObject
    {
        public AuctionStatus? Status { get; set; } = null;
        public string? Category { get; set; } = null;
    }
}