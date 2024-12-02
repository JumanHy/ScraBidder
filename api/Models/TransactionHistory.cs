using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
        public class TransactionHistory
        {
                [Key]
                public string TransactionId { get; set; }

                [Required]
                public string UserId { get; set; }

                [Required]
                public int AuctionId { get; set; }
                public string? RelatedId { get; set; } = string.Empty;
                public string PayerEmail { get; set; } = string.Empty;
                public string PayerId { get; set; } = string.Empty;

                [Required]
                [Column(TypeName = "decimal(18, 2)")]
                public decimal Amount { get; set; }

                public DateTime CreatedAt { get; set; }

                [Required]
                public TransactionType TransactionType { get; set; } // Enum: order, authorization, capture, refund
                public TransactionPurpose TransactionPurpose { get; set; } // Enum: purchase, deposit

                public string Status { get; set; } //failed, completed..etc
                public string CurrencyCode { get; set; }
                public ApplicationUser User { get; set; }
                public Auction Auction { get; set; }
        }

}