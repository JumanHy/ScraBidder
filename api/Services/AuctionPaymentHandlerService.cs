using System;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using api.Data;
using api.Enums;
using api.Interfaces;
using api.Models;
using api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

public class AuctionPaymentHandlerService : BackgroundService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly PayPalService _payPalService;
    private readonly ILogger<AuctionPaymentHandlerService> _logger;
    public AuctionPaymentHandlerService(
        IServiceScopeFactory serviceScopeFactory,
        PayPalService payPalService,
        ILogger<AuctionPaymentHandlerService> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _payPalService = payPalService;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    var transactionRepository = scope.ServiceProvider.GetRequiredService<ITransactionHistoryRepository>();

                    await CaptureEndedAuctionsAsync(transactionRepository);
                    await RefundEndedAuctionsAsync(transactionRepository);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in AuctionPaymentHandlerService: {ex.Message}");
            }

            // Wait before running again
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }

    private async Task CaptureEndedAuctionsAsync(ITransactionHistoryRepository transactionRepository)
    {
        _logger.LogInformation("Capturing is Started.");
        // Fetch authorized transactions for capturing using the repository
        var authorizedTransactions = await transactionRepository.GetAuthorizedTransactionsForCapturingAsync();

        if (!authorizedTransactions.Any())
        {
            _logger.LogInformation("No authorized transactions found for capturing.");
            return;
        }

        foreach (var transactionResult in authorizedTransactions)
        {
            var transaction = transactionResult.Transaction;
            var auction = transactionResult.Auction;

            var winningBid = transactionResult.WinningBid;
            if (winningBid == null)
            {
                _logger.LogWarning($"No winning bid found for auction {auction.AuctionId}.");
                continue;
            }

            var latestShipment = transactionResult.LatestShipment;
            var isDelivered = latestShipment != null && latestShipment.DeliveryStatus == DeliveryStatus.Delivered;

            // Check if the transaction has already been captured
            if (transaction.TransactionType == TransactionType.Capture)
            {
                _logger.LogInformation($"The {transaction.TransactionPurpose} for auction {auction.AuctionId} has already been captured.");
                continue;
            }

            // Ensure item delivery if the transaction is a purchase
            if (transaction.TransactionPurpose == TransactionPurpose.Purchase && !isDelivered)
            {
                _logger.LogInformation($"Cannot capture purchase for auction {auction.AuctionId} because the item has not been delivered.");
                continue;
            }

            try
            {
                // Capture the authorized transaction using PayPal
                var captureResult = await _payPalService.CaptureAuthorizedPaymentAsync(transaction.TransactionId, transaction.Amount);

                // Log the captured transaction
                var newTransaction = new TransactionHistory
                {
                    TransactionId = captureResult.Id,
                    Amount = transaction.Amount,
                    CurrencyCode = transaction.CurrencyCode,
                    PayerEmail = transaction.PayerEmail,
                    PayerId = transaction.PayerId,
                    AuctionId = auction.AuctionId,
                    UserId = winningBid.BidderId,
                    TransactionPurpose = transaction.TransactionPurpose,
                    TransactionType = TransactionType.Capture,
                    Status = captureResult.Status,
                    CreatedAt = DateTime.UtcNow,
                    RelatedId = transaction.TransactionId
                };

                await transactionRepository.AddAsync(newTransaction);

                _logger.LogInformation($"Captured {transaction.TransactionPurpose} for auction {auction.AuctionId} from bidder {winningBid.BidderId}.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error capturing {transaction.TransactionPurpose} for auction {auction.AuctionId} from bidder {winningBid.BidderId}: {ex.Message}");
            }


        }


    }

    private async Task RefundEndedAuctionsAsync(ITransactionHistoryRepository transactionRepository)
    {
        _logger.LogInformation("Refund is Started.");
        var authorizedTransactions = await transactionRepository.GetAuthorizedTransactionsForVoidAsync();


        if (!authorizedTransactions.Any())
        {
            _logger.LogInformation("No authorized transactions found for refund.");
            return;
        }

        foreach (var transaction in authorizedTransactions)
        {
            try
            {
                // Void the authorized payment
                var result = await _payPalService.VoidAuthorizedPaymentAsync(transaction.TransactionId);

                // Create a new transaction record for the refund
                var newTransaction = new TransactionHistory
                {
                    TransactionId = "_" + transaction.TransactionId, // New unique ID
                    Amount = transaction.Amount,
                    CurrencyCode = transaction.CurrencyCode,
                    PayerEmail = transaction.PayerEmail,
                    PayerId = transaction.PayerId,
                    AuctionId = transaction.AuctionId,
                    UserId = transaction.UserId,
                    TransactionPurpose = transaction.TransactionPurpose,
                    TransactionType = TransactionType.Refund,
                    Status = "VOIDED",
                    CreatedAt = DateTime.UtcNow,
                    RelatedId = transaction.TransactionId
                };

                await transactionRepository.AddAsync(newTransaction);

                _logger.LogInformation($"Voided deposit {transaction.TransactionId} for auction {transaction.AuctionId}.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error refunding deposit {transaction.TransactionId} for auction {transaction.AuctionId}: {ex.Message}");
            }
        }

        _logger.LogInformation("Finished processing refunds for all ended auctions.");
    }


}
