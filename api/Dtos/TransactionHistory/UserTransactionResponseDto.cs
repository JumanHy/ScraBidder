using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos.TransactionHistory
{
    public class UserTransactionResponseDto
    {
        public string TransactionId { get; set; }
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }

        public TransactionType TransactionType { get; set; }
        public TransactionPurpose TransactionPurpose { get; set; }
        public string Status { get; set; }
        public UserTransactionAuctionDto Auction { get; set; }
    }
}