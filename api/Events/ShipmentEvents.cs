// Events/AuctionEvents.cs

using api.Enums;

namespace api.Events
{
    // Event for changing auction status
    public record ShipmentEvent(string BuyerId, int AuctionId, DeliveryStatus DeliveryStatus);

}
