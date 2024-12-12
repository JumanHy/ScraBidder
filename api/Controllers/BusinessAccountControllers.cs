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
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSettingController : ControllerBase
    {
        private readonly IUserSettingService _userSettingService;
        private readonly ApplicationDBContext _context; // Replace with your actual DbContext class name
        private readonly UserManager<ApplicationUser> _userManager;

        public UserSettingController(IUserSettingService userSettingService, ApplicationDBContext context, UserManager<ApplicationUser> userManager)
        {
            _userSettingService = userSettingService;
            _context = context;
            _userManager = userManager;
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


        [HttpPost("upload-images/{userId}")]
        public async Task<IActionResult> UploadImages(string userId, IFormFile[] images)
        {
            if (images == null || images.Length == 0)
            {
                return BadRequest("No images uploaded.");
            }

            var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);
            if (business == null)
            {
                return NotFound("Business not found for the given user ID.");
            }

            // Deserialize existing images or initialize a new list
            var imageList = string.IsNullOrEmpty(business.Images)
                ? new List<ImageData>()
                : JsonConvert.DeserializeObject<List<ImageData>>(business.Images);

            foreach (var image in images)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await image.CopyToAsync(memoryStream);
                    var base64String = Convert.ToBase64String(memoryStream.ToArray());

                    // Create a new ImageData object
                    var imageData = new ImageData
                    {
                        Id = Guid.NewGuid().ToString(),
                        Base64 = base64String,
                        UploadedAt = DateTime.UtcNow
                    };

                    imageList.Add(imageData);
                }
            }

            // Serialize the updated list and save it back to the Business entity
            business.Images = JsonConvert.SerializeObject(imageList);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Images uploaded successfully." });
        }



        [HttpGet("get-images/{userId}")]
        public async Task<IActionResult> GetImages(string userId)
        {
            var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);
            if (business == null || string.IsNullOrEmpty(business.Images))
            {
                return NotFound("No images found for the given user ID.");
            }

            // Deserialize the JSON string into a list of ImageData objects
            var imageList = JsonConvert.DeserializeObject<List<ImageData>>(business.Images);

            return Ok(new { Images = imageList });
        }




        [HttpDelete("delete-image/{userId}/{imageId}")]
        public async Task<IActionResult> DeleteImage(string userId, string imageId)
        {
            var business = await _context.Businesses.FirstOrDefaultAsync(b => b.UserId == userId);
            if (business == null || string.IsNullOrEmpty(business.Images))
            {
                return NotFound("No images found for the given user ID.");
            }

            // Deserialize the JSON string into a list of ImageData objects
            var imageList = JsonConvert.DeserializeObject<List<ImageData>>(business.Images);

            // Find and remove the image with the given Id
            var imageToDelete = imageList.FirstOrDefault(img => img.Id == imageId);
            if (imageToDelete == null)
            {
                return NotFound("Image not found.");
            }

            imageList.Remove(imageToDelete);

            // Serialize the updated list and save it back to the Business entity
            business.Images = JsonConvert.SerializeObject(imageList);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Image deleted successfully." });
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


        [HttpGet("company-name")]
        public async Task<IActionResult> GetBusinessName([FromQuery] string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "UserId is required" });
            }

            var business = await _context.Businesses
                .FirstOrDefaultAsync(b => b.UserId == userId);

            if (business == null)
            {
                return NotFound(new { message = "Business not found for the given UserId" });
            }

            return Ok(new { business.BusinessName });
        }


        [HttpGet("vision/{userId}")]
        public async Task<ActionResult<string>> GetCompanyVisionByUserId(string userId)
        {
            // Fetch the business by UserId
            var business = await _context.Businesses
                .FirstOrDefaultAsync(b => b.UserId == userId);

            if (business == null)
            {
                return NotFound("Business not found for the given UserId");
            }


            return Ok(business.CompanyVision);
        }

        [HttpGet("contacts/{userId}")]
        public async Task<ActionResult<BusinessContactDto>> GetBusinessContacts([FromRoute] string userId)
        {
            // Fetch business contacts for the given userId
            var businessContacts = await _userSettingService.GetBusinessContactsAsync(userId);

            // If no business contacts are found, return NotFound
            if (businessContacts == null)
            {
                return NotFound("No business contacts found for this user.");
            }

            // Return the fetched business contacts
            return Ok(businessContacts);
        }








    }









}











