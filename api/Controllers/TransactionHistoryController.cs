using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/transaction-history")]
    public class TransactionHistoryController : ControllerBase
    {
        private readonly ITransactionHistoryRepository _transactionRepository;

        public TransactionHistoryController(ITransactionHistoryRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }


        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetTransactionHistoryByUserId([FromRoute] string userId)
        {
            var authorizedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (authorizedUserId != userId || string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(authorizedUserId))
            {
                return Unauthorized();
            }

            var transactionHistory = await _transactionRepository.GetTransactionHistoryByUserIdAsync(userId);
            var transactionsDto = transactionHistory.Select(t => t.ToUserTransactionResponseDto()).ToList();

            return Ok(transactionsDto);

        }
    }
}