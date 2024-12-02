using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Auction
{
    public class SellerDto
    {
        public string SellerId { get; set; }
        public int BusinessId { get; set; }
        public string BusinessName { get; set; }
    }
}