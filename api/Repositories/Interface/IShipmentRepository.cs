using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Interface
{
    public interface IShipmentRepository
    {
        Task<IEnumerable<Shipment>> GetShipmentsForUserAsync(string userId);
        Task<Shipment?> GetShipmentByIdAsync(int shipmentId);
        Task AddShipmentAsync(Shipment shipment);
        Task UpdateShipmentAsync(Shipment shipment);
    }
}