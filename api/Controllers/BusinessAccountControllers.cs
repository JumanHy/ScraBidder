using Microsoft.AspNetCore.Mvc;
using api.Dtos;
using api.Interfaces;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSettingController : ControllerBase
    {
        private readonly IUserSettingService _userSettingService;
        private readonly ApplicationDBContext _context; // Replace with your actual DbContext class name

        // Constructor to inject the IUserSettingService and DbContext
        public UserSettingController(IUserSettingService userSettingService, ApplicationDBContext context)
        {
            _userSettingService = userSettingService;
            _context = context;
        }

        // Endpoint to get business primary info
        [HttpGet("business-primary-info")]
        public async Task<ActionResult<PrimaryBusenissinfoDto>> GetBusinessInfo(string userId)
        {
            var businessInfo = await _userSettingService.GetBusinessInfoAsync(userId);

            if (businessInfo == null)
                return NotFound();

            return Ok(businessInfo);
        }

        // Endpoint to update business info
        [HttpPut("update-business-primary-info")]
        public async Task<ActionResult> UpdateBusinessInfo([FromBody] PrimaryBusenissinfoDto businessDto)
        {
            var result = await _userSettingService.UpdateBusinessInfoAsync(businessDto);

            if (!result)
                return BadRequest("Failed to update business information.");

            return NoContent();
        }

        // Endpoint to get the company service by user ID
        [HttpGet("company-service/{userId}")]
        public async Task<IActionResult> GetCompanyServiceByUserId(string userId)
        {
            var companyService = await _userSettingService.GetCompanyServiceByUserIdAsync(userId);

            if (companyService == null)
                return NotFound("Company service not found.");

            return Ok(companyService);
        }

        // Endpoint to update company service information
        [HttpPut("update-company-service")]
        public async Task<IActionResult> UpdateCompanyService([FromBody] CompanyServiceDto companyServiceDto)
        {
            if (companyServiceDto == null)
                return BadRequest("Invalid data.");

            var updatedCompanyService = await _userSettingService.UpdateCompanyServiceAsync(companyServiceDto);
            if (updatedCompanyService == null)
                return NotFound("Company service not found.");

            return Ok(updatedCompanyService);
        }

        // Endpoint to upload images
        [HttpPost("upload-images/{userId}")]
public async Task<IActionResult> UploadImages(string userId, IFormFile[] images)
{
    if (images == null || images.Length == 0)
    {
        return BadRequest("No images uploaded.");
    }

    // Convert images to base64 strings
    List<string> imageBase64List = new List<string>();

    foreach (var image in images)
    {
        using (var memoryStream = new MemoryStream())
        {
            await image.CopyToAsync(memoryStream);
            string base64String = Convert.ToBase64String(memoryStream.ToArray());
            imageBase64List.Add(base64String);
        }
    }

    // Find the business using UserId
    var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);
    if (business == null)
    {
        return NotFound("Business not found for the given user ID.");
    }

    // Store the base64 images as a JSON string in the Images property
    business.Images = JsonConvert.SerializeObject(imageBase64List);
    await _context.SaveChangesAsync();

    return Ok(new { Message = "Images uploaded successfully." });
}

        // Endpoint to get images
        [HttpGet("get-images/{userId}")]
public async Task<IActionResult> GetImages(string userId)
{
    // Find the business using UserId
    var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);

    if (business == null || string.IsNullOrEmpty(business.Images))
    {
        return NotFound("No images found for the given user ID.");
    }

    // Deserialize the base64 strings from JSON
    var imageDataList = JsonConvert.DeserializeObject<List<string>>(business.Images);
    return Ok(new { Images = imageDataList });
}






    [HttpPost("upload-location/{userId}")]
public async Task<IActionResult> UploadLocation(string userId, [FromBody] LocationDto locationDto)
{
    if (locationDto == null || string.IsNullOrEmpty(locationDto.Latitude) || string.IsNullOrEmpty(locationDto.Longitude))
    {
        return BadRequest("Invalid location data.");
    }

    // Find the business using UserId
    var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);
    if (business == null)
    {
        return NotFound("Business not found for the given user ID.");
    }

    // Serialize the location into a JSON string
    var locationJson = JsonConvert.SerializeObject(new
    {
        latitude = locationDto.Latitude,
        longitude = locationDto.Longitude,
        address = locationDto.Address
    });

    // Update the Address property
    business.Address = locationJson;
    await _context.SaveChangesAsync();

    // Deserialize and return the updated location
    var updatedLocation = JsonConvert.DeserializeObject<object>(locationJson);

    return Ok(new { Message = "Location uploaded successfully.", Location = updatedLocation });
}
[HttpGet("get-location/{userId}")]
public async Task<IActionResult> GetLocation(string userId)
{
    var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);

    if (business == null || string.IsNullOrEmpty(business.Address))
    {
        return NotFound("Location not found for this business.");
    }

    // Deserialize the Address JSON
    var locationData = JsonConvert.DeserializeObject<object>(business.Address);
    return Ok(new { Location = locationData });
}





}}

