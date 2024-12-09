using api.Enums;

namespace api.Events
{
    // Event for changing auction status
    public record UserStatusUpdatedEvent(string UserId, string NewStatus);

}
