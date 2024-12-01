using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Auction;
using api.Models;
using api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using api.Dtos.BiddingHistory;

namespace api.Mappers
{
    public static class AuctionMappers
    {
        public static AuctionDto ToAuctionDto(this Auction auctionModel)
        {
            return new AuctionDto
            {
                AuctionId=auctionModel.AuctionId,
                Title=auctionModel.Title,
                bidDtos = auctionModel.Biddings != null?
                auctionModel.Biddings.Select(b => b.ToBidDto()).ToList() 
                : new List<BidDto>(),
                seller=auctionModel.Seller.Email,
                category=auctionModel.Category.CategoryName,
                CurrentBid=auctionModel.CurrentBid
            };
        }
        public static Auction? ToAuctionFromCreateDto(this CreateAuctionRequestDto auctionDto)
        {
            if(auctionDto.StartingTime>=auctionDto.EndingTime || auctionDto.StartingTime<DateTime.Now)
            {
                return null;
            }
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };


            var currentDirectory = Directory.GetCurrentDirectory();
            var mainFolder = Directory.GetParent(currentDirectory)?.FullName;

            var uploadsFolder = Path.Combine(mainFolder, "frontend", "src","assets","images");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);



            Dictionary<string, string> pathDictionary = new Dictionary<string, string>();

            int cnt=0;
            
            foreach (var item in auctionDto.Images)
            {
                var extension = Path.GetExtension(item.FileName);
                if (!allowedExtensions.Contains(extension.ToLower()))
                    return null;
                var uniqueFileName = $"{Guid.NewGuid()}_{item.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    item.CopyTo(stream);
                }
                pathDictionary.Add($"path{cnt + 1}",uniqueFileName);
                cnt++;
            }
            string json = JsonSerializer.Serialize(pathDictionary);

            string status="Accepted";
            if(auctionDto.StartingTime <= DateTime.Now && auctionDto.EndingTime>DateTime.Now)
            {
                status="Active";
            }
            else if(auctionDto.StartingTime > DateTime.Now)
            {
                status="Pending";
            }
            return new Auction
            {
                Images=json,
                SellerId=auctionDto.SellerId,
                Title=auctionDto.Title,
                Description=auctionDto.Description,
                CategoryId=auctionDto.CategoryId,
                AuctionStatus=status,
                StartingBid=auctionDto.StartingBid,
                ReservePrice=auctionDto.ReservePrice,
                StartingTime=auctionDto.StartingTime,
                EndingTime=auctionDto.EndingTime,
                Address=auctionDto.Address,
                Condition=auctionDto.Condition,
                Quantity=auctionDto.Quantity,
            };
        }

        
    }
}