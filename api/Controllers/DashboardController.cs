using api.Service;
using api.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
namespace api.Controllers
{
    [Route("api/Dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IUserService _userService;
        public DashboardController(IUserService userService)
        {
            _userService = userService;
        }
        [HttpGet("stats")]
        public async Task<ActionResult<DashboardStatsDTO>> GetDashboardStats()
        {
            try
            {
                var stats = await _userService.GetDashboardStatsAsync();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Error fetching dashboard stats: {ex.Message}");
                return StatusCode(500, new
                {
                    Message = "An error occurred while fetching dashboard statistics.",
                    Error = ex.Message
                });
            }
        }
        [HttpGet("all-users")]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }
        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> GetUserByUsernameOrEmail([FromQuery] string usernameOrEmail)
        {
            if (string.IsNullOrEmpty(usernameOrEmail))
                return BadRequest("Username or email is required.");
            var user = await _userService.GetUserByUsernameOrEmailAsync(usernameOrEmail);
            if (user == null)
                return NotFound("User not found.");
            return Ok(user);
        }
        [HttpGet("seller-dashboard/{sellerId}")]

        public async Task<IActionResult> GetSellerDashboard([FromRoute] string sellerId)
        {
            var dashboardData = await _userService.GetSellerDashboardDataAsync(sellerId);
            return Ok(dashboardData);
        }

        [HttpPatch("update-selected-users")]
        public async Task<IActionResult> UpdateUsersStatus([FromBody] List<UserUpdateDto> userUpdateDtos)
        {
            if (userUpdateDtos == null || userUpdateDtos.Count == 0)
            {
                return BadRequest("The list of users to update cannot be empty.");
            }

            try
            {
                // Update only the status using the original DTO
                var result = await _userService.UpdateUsersStatusAsync(userUpdateDtos);
                if (result)
                {
                    return Ok("Users' statuses updated successfully.");
                }
                else
                {
                    return NotFound("No matching users found to update.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}