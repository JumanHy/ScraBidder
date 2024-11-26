using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface ITransactionHistoryRepository
    {
        Task<List<TransactionHistory>> GetTransactionsAsync(
        string? transactionId = null,
        string? relatedId = null,
        int? userId = null,
        int? auctionId = null,
        TransactionPurpose? purpose = null,
        TransactionType? type = null,
        string? status = null);
        Task AddAsync(TransactionHistory transaction);
    }
}