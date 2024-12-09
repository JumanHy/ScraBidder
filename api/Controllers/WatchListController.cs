using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.WatchList;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    [Route("api/watch-list")]
    public class WatchListController : ControllerBase
    {
        private readonly WatchListService _watchListService;

        public WatchListController(WatchListService watchListService)
        {
            _watchListService = watchListService;
        }

        // POST: api/watchlist/add
        [HttpPost("auction/{auctionId}")]
        [Authorize]
        public async Task<IActionResult> AddWatchList([FromRoute] int auctionId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var response = await _watchListService.AddWatchListAsync(auctionId, userId);

                return CreatedAtAction(nameof(GetUserWatchLists), new { userId }, response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine(ex.StackTrace);
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // POST: api/watchlist/remove
        [HttpDelete("auction/{auctionId}")]
        [Authorize]
        public async Task<IActionResult> RemoveWatchList([FromRoute] int auctionId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var response = await _watchListService.RemoveWatchListAsync(auctionId, userId);
                return Ok(response);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET: api/watchlist/{userId}
        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetUserWatchLists([FromRoute] string userId)
        {
            try
            {
                var authorizedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId) || authorizedUserId != userId)
                {
                    return Unauthorized();
                }

                var response = await _watchListService.GetUserWatchListsAsync(userId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpGet("user/{userId}/auction/{auctionId}")]
        [Authorize]
        public async Task<IActionResult> GetUserWatchList([FromRoute] string userId, [FromRoute] int auctionId)
        {
            try
            {
                var authorizedUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId) || authorizedUserId != userId)
                {
                    return Unauthorized();
                }

                var response = await _watchListService.GetUserWatchListAsync(userId, auctionId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        // GET: api/watchlist
        [HttpGet]
        public async Task<IActionResult> GetAllWatchLists()
        {
            try
            {
                var response = await _watchListService.GetAllWatchListsAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
