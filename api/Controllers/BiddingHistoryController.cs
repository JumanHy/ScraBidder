using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.BiddingHistory;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/biddinghistory")]
    [ApiController]
    public class BiddingHistoryController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IBiddingHistoryRepository _bidRepo;
        public BiddingHistoryController(ApplicationDBContext context, IBiddingHistoryRepository bidRepo)
        {
            _context = context;
            _bidRepo = bidRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBids()
        {
            var biddings = await _bidRepo.GetAllAsync();
            var biddingsDto = biddings.Select(b => b.ToBidDto()).ToList();
            return Ok(biddingsDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var bid = await _bidRepo.GetByIdAsync(id);
            if (bid == null)
            {
                return NotFound();
            }
            var bidDto = bid.ToBidDto();
            return Ok(bidDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBid([FromForm] CreateBidDto createBidDto)
        {
            var bid = createBidDto.ToBidFromCreateDto();
            if (bid == null) return BadRequest();
            var result = await _bidRepo.CreateBidAsync(bid);

            if (result == null) return BadRequest();

            var bidDto = result.ToBidDto();
            return Ok(bidDto);
        }

    }
}