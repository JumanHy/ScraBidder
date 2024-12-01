using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos
{
    public class CreateOrderRequestDto
    {
        public int UserId { get; set; }
        public int AuctionId { get; set; }
        public decimal Amount { get; set; }
        public TransactionPurpose Purpose { get; set; }
        private string _intent = string.Empty;

        public string Intent
        {
            get => _intent;
            set => _intent = value?.ToUpper() ?? string.Empty; // Convert to uppercase and handle nulls
        }
    }
}