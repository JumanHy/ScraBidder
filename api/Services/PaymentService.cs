using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Enums;
using api.Interfaces;
using api.Models;
using api.Repositories;

namespace api.Services
{
    public class PaymentService
    {
        private readonly ITransactionHistoryRepository _transactionRepository;
        private readonly PayPalService _payPalService;

        public PaymentService(ITransactionHistoryRepository transactionRepository, PayPalService payPalService)
        {
            _transactionRepository = transactionRepository;
            _payPalService = payPalService;
        }
        public async Task<object> CreateOrderAsync(CreateOrderRequestDto request)
        {
            // Step 1: Check for existing deposit
            var existingAuthorizedOrder = await _transactionRepository.GetTransactionsAsync(userId: request.UserId, auctionId: request.AuctionId, purpose: request.Purpose, type: TransactionType.Authorization);
            if (existingAuthorizedOrder.Any())
            {
                throw new Exception($"A {request.Purpose.ToString().ToLower()} has already been authorized for this auction.");

            }

            var existingOrderedDeposit = await _transactionRepository.GetTransactionsAsync(userId: request.UserId, auctionId: request.AuctionId, purpose: request.Purpose, type: TransactionType.Order);
            if (existingOrderedDeposit.Any())
            {
                var existingOrderId = existingOrderedDeposit.FirstOrDefault()?.TransactionId; // Get the first order's ID
                return new { orderId = existingOrderId };
            }
            // Step 2: Create a PayPal Order
            var orderId = await _payPalService.CreateOrderAsync(request.Amount, request.Intent, "USD");

            // Step 3: Log Order in Transaction History
            var orderTransaction = new TransactionHistory
            {
                TransactionId = orderId,
                UserId = request.UserId,
                AuctionId = request.AuctionId,
                Amount = request.Amount,
                TransactionType = TransactionType.Order,
                TransactionPurpose = request.Purpose,
                Status = "CREATED",
                CreatedAt = DateTime.UtcNow,
                CurrencyCode = "USD",
                RelatedId = null
            };
            await _transactionRepository.AddAsync(orderTransaction);

            // Return orderId to frontend
            return new { orderId };
        }
        public async Task<object> AuthorizePaymentAsync(AuthorizeRequestDto request)
        {
            var authorizationResult = await _payPalService.AuthorizePaymentAsync(request.OrderId);
            var payerEmail = authorizationResult.Payer.EmailAddress;
            var payerId = authorizationResult.Payer.PayerId;

            // Check if 'purchase_units' exists and get the first purchase unit safely
            var purchaseUnits = authorizationResult.PurchaseUnits;
            var firstPurchaseUnit = purchaseUnits.FirstOrDefault();
            var payments = firstPurchaseUnit?.Payments;

            // Check if 'authorizations' exists and retrieve the first authorization safely
            var authorizations = payments?.Authorizations;
            var firstAuthorization = authorizations?.FirstOrDefault();

            // Safely extract values from the authorization object
            var authorizationId = firstAuthorization?.Id;
            var amount = firstAuthorization?.Amount.Value;

            var status = firstAuthorization?.Status;

            // If any of the critical values are null, log and return an error response
            if (authorizationId == null || amount == null || status == null)
            {
                throw new Exception("Authorization response is missing critical information.");
            }

            // Log Authorization in Transaction History
            var authorizationTransaction = new TransactionHistory
            {
                TransactionId = authorizationId,
                UserId = request.UserId,
                AuctionId = request.AuctionId,
                Amount = decimal.Parse(amount?.ToString()), // Ensure 'value' is a valid decimal
                TransactionType = TransactionType.Authorization,
                TransactionPurpose = request.Purpose,
                Status = status,
                CreatedAt = DateTime.UtcNow,
                CurrencyCode = "USD",
                RelatedId = request.OrderId,
                PayerEmail = payerEmail ?? string.Empty,
                PayerId = payerId ?? string.Empty
            };
            await _transactionRepository.AddAsync(authorizationTransaction);

            // Return the final authorization result
            return authorizationResult;
        }

    }

}