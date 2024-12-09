using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface ITransactionHistoryRepository
    {
        Task<List<TransactionHistory>> GetTransactionsAsync(
        string? transactionId = null,
        string? relatedId = null,
        string? userId = null,
        int? auctionId = null,
        TransactionPurpose? purpose = null,
        TransactionType? type = null,
        string? status = null);
        Task AddAsync(TransactionHistory transaction);
        Task<List<AuthorizedTransactionResultForCapturing>> GetAuthorizedTransactionsForCapturingAsync();
        Task<List<TransactionHistory?>> GetAuthorizedTransactionsForVoidAsync();

        Task<List<TransactionHistory>> GetTransactionHistoryByUserIdAsync(string userId);
    }
}