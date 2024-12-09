// Events/AuctionEvents.cs

using api.Enums;

namespace api.Events
{
    // Event for changing auction status
    public record TransactionEvent(int AuctionId, string UserId, TransactionPurpose Purpose, TransactionType Type);

}
