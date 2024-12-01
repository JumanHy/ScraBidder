using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos
{
    public class AuthorizeRequestDto
    {

        public int UserId { get; set; }
        public int AuctionId { get; set; }
        public TransactionPurpose Purpose { get; set; }
        public string OrderId { get; set; } = string.Empty;

    }
}