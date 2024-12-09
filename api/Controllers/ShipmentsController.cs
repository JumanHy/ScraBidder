using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Enums;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/shipments")]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _service;

        public ShipmentsController(IShipmentService service)
        {
            _service = service;
        }

        [HttpGet("seller")]
        [Authorize]
        public async Task<IActionResult> GetShipmentsForSeller()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Assume authentication
            if (userId == null) return Unauthorized();

            var shipments = await _service.GetShipmentsForSellerAsync(userId);
            return Ok(shipments);
        }

        [HttpGet("buyer")]
        [Authorize]
        public async Task<IActionResult> GetShipmentsForBuyer()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Assume authentication
            if (userId == null) return Unauthorized();

            var shipments = await _service.GetShipmentsForBuyerAsync(userId);
            return Ok(shipments);
        }

        [HttpPost("{id}/update-status")]
        [Authorize]
        public async Task<IActionResult> UpdateDeliveryStatus(int id, [FromBody] DeliveryStatus newStatus)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Assume authentication

            await _service.UpdateDeliveryStatusAsync(id, newStatus, userId);
            return NoContent();
        }
    }

}