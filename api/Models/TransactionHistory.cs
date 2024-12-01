using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TransactionHistory
    {
        [Key]
        public int TransactionId { get; set; }

        [Required]
        public int UserId { get; set; }

        public int AuctionId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; }

        [Required]
        public string PaymentStatus { get; set; } // Enum: completed, authorized, failed

        public int PaymentMethodId { get; set; }

        [Required]
        public string TransactionType { get; set; } // Enum: deposit, refund, sale

        public ApplicationUser User { get; set; }
        public Auction Auction { get; set; }
    }

}