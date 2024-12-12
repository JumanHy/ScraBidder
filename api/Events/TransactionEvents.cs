// Events/AuctionEvents.cs

using api.Enums;

namespace api.Events
{
    // Event for changing auction status
    public record TransactionEvent(string AuctionTitle, string UserId, TransactionPurpose Purpose, TransactionType Type);

}
