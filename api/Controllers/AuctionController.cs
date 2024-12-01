using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Auction;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/auction")]
   
    public class AuctionController:ControllerBase
    {
        private readonly IAuctionRepository _auctionRepo;
        private readonly ApplicationDBContext _context;
        public AuctionController(ApplicationDBContext context,IAuctionRepository auctionRepo)
        {
            _auctionRepo=auctionRepo;
            _context=context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAuctions([FromQuery] QueryObject query)
        {
            var auctions=await _auctionRepo.GetAllAuctionsAsync(query);
            var result=auctions;
            return Ok(result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuctionById([FromRoute]int id)
        {
            var auction=await _auctionRepo.GetAuctionByIdAsync(id);
            if(auction==null){
                return NotFound();
            }
            return Ok(auction);
        }
        [HttpPost]
        public async Task<IActionResult> CreateAuction([FromForm] CreateAuctionRequestDto createDto)
        {
            var auction=createDto.ToAuctionFromCreateDto();
            if(auction==null) return BadRequest();
            await _auctionRepo.CreateAuctionAsync(auction);
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateAuction([FromRoute] int id, [FromForm] UpdateAuctionDto updatedto)
        {
            var auction =await _auctionRepo.UpdateAuctionAsync(id,updatedto);
            if(auction==null)
            {
                return NotFound();
            }
            return Ok(auction);
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteAuction([FromRoute] int id)
        {
            var auction =await _auctionRepo.DeleteAuctionAsync(id);
            if(auction==null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}