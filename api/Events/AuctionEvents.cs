// Events/AuctionEvents.cs

using api.Enums;

namespace api.Events
{
    // Event for changing auction status
    public record AuctionStatusChangedEvent(int AuctionId, string AuctionTitle, string SellerId, AuctionStatus NewStatus);

    // Event for auction starting
    public record AuctionStartedEvent(int AuctionId, string AuctionTitle, string SellerId, List<string> Watchers);

    // Event for auction ending
    public record AuctionEndedEvent(int AuctionId, string AuctionTitle, string SellerId, List<string> Watchers, string? WinnerId);
}
