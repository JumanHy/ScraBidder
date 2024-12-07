using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using api.Dtos.TransactionHistory;
using api.Models;

namespace api.Mappers
{
    public static class TransactionHistoryMappers
    {
        public static UserTransactionResponseDto ToUserTransactionResponseDto(this TransactionHistory transactionHistoryModel)
        {
            return new UserTransactionResponseDto
            {
                TransactionId = transactionHistoryModel.TransactionId,
                UserId = transactionHistoryModel.UserId,
                Amount = transactionHistoryModel.Amount,
                CreatedAt = transactionHistoryModel.CreatedAt,
                TransactionType = transactionHistoryModel.TransactionType,
                TransactionPurpose = transactionHistoryModel.TransactionPurpose,
                Status = transactionHistoryModel.Status,
                Auction = new UserTransactionAuctionDto
                {
                    AuctionId = transactionHistoryModel.AuctionId,
                    Title = transactionHistoryModel.Auction.Title,
                }
            };
        }
    }
}