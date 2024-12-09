namespace api.Enums
{
    public enum DeliveryStatus
    {
        Pending = 1, // Shipment is created but not yet shipped
        Shipped, // Shipment has been shipped
        InTransit, // Shipment is on its way
        Delivered// Shipment has been delivered
    }
}