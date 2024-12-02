using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using api.Interfaces;
using api.Data;
using Microsoft.EntityFrameworkCore;
using api.Models;
using api.Dtos; // Ensure this is imported for the Individual model and DTOs

namespace api.Controllers
{
    [Route("api/IndividualAccount")]
    [ApiController]
    public class IndividualAccountController : ControllerBase
    {
        private readonly IUserSettingService _userSettingService;
        private readonly ApplicationDBContext _context;

        // Inject IUserSettingService and ApplicationDbContext into the controller
        public IndividualAccountController(IUserSettingService userSettingService, ApplicationDBContext context)
        {
            _userSettingService = userSettingService;
            _context = context;
        }

        // Get Individual User Info by User ID
        [HttpGet("userdetails")]
        public async Task<IActionResult> GetUserInfo(string userId)
        {
            var userInfo = await _userSettingService.GetUserInfoAsync(userId);

            if (userInfo == null)
                return NotFound("User not found.");

            return Ok(userInfo);
        }

        // Update Individual User Info
        [HttpPut("update-user-details")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] UserSettingUpdateDto userUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userSettingService.UpdateUserInfoAsync(userUpdateDto);

            if (!result)
                return BadRequest("Failed to update user information.");

            // Return the updated data or a success message
            return Ok("User information updated successfully.");
        }

        // Upload Location for Individual User
        [HttpPost("upload-location/{userId}")]
        public async Task<IActionResult> UploadLocationForIndividual(string userId, [FromBody] LocationDto locationDto)
        {
            // Validate the input data
            if (locationDto == null || string.IsNullOrEmpty(locationDto.Latitude) || string.IsNullOrEmpty(locationDto.Longitude))
            {
                return BadRequest("Invalid location data.");
            }

            // Find the individual user using the UserId
            var individualUser = await _context.Individuals.FirstOrDefaultAsync(u => u.UserId == userId); 
            if (individualUser == null)
            {
                return NotFound("Individual user not found for the given user ID.");
            }

            // Serialize the location into a JSON string
            var locationJson = JsonConvert.SerializeObject(new
            {
                latitude = locationDto.Latitude,
                longitude = locationDto.Longitude,
                address = locationDto.Address
            });

            // Update the Address property in the Individual table with the location JSON
            individualUser.Address = locationJson;

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Deserialize the location to send it back as a response
            var updatedLocation = JsonConvert.DeserializeObject<object>(locationJson);

            // Return success message with the updated location
            return Ok(new { Message = "Location uploaded successfully.", Location = updatedLocation });
        }
    }
}
