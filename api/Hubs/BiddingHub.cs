using System.Security.Claims;
using api.Data;
using api.Dtos.Auction;
using api.Dtos.BiddingHistory;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

public class BiddingHub : Hub
{
    public override Task OnConnectedAsync()
    {
        var userId = Context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Maps to JWT's Name or "sub" claim
        Console.WriteLine($"User connected from bidding: {userId}");
        return base.OnConnectedAsync();
    }
    // Method to notify all clients about a new bid
    public async Task NotifyBidUpdate(int auctionId, decimal currentBid, List<AuctionBiddingDto> biddings)
    {
        Console.WriteLine("notified successfully");
        await Clients.All.SendAsync("ReceiveBidUpdate", auctionId, currentBid, biddings);
    }
}