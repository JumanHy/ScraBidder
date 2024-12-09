using api.Data;
using api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

public class BiddingHub : Hub
{
    // Method to notify all clients about a new bid
    public async Task NotifyBidUpdate(int auctionId, decimal currentBid, List<BiddingHistory> biddings)
    {
        await Clients.All.SendAsync("ReceiveBidUpdate", auctionId, currentBid, biddings);
    }
}