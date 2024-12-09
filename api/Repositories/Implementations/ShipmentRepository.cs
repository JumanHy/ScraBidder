using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Implementations
{
    public class ShipmentRepository : IShipmentRepository
    {
        private readonly ApplicationDBContext _context;

        public ShipmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Shipment>> GetShipmentsForUserAsync(string userId)
        {
            return await _context.Shipments
                .Include(s => s.Seller.Business)
                .Include(s => s.Buyer.Business)
                .Include(s => s.Buyer.Individual)
                .Include(s => s.Auction)
                .Where(s => s.SellerId == userId || s.BuyerId == userId)
                .ToListAsync();
        }

        public async Task<Shipment?> GetShipmentByIdAsync(int shipmentId)
        {
            return await _context.Shipments
                .Include(s => s.Seller.Business)
                .Include(s => s.Buyer.Business)
                .Include(s => s.Buyer.Individual)
                .Include(s => s.Auction)
                .FirstOrDefaultAsync(s => s.ShipmentId == shipmentId);
        }

        public async Task AddShipmentAsync(Shipment shipment)
        {
            await _context.Shipments.AddAsync(shipment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateShipmentAsync(Shipment shipment)
        {
            _context.Shipments.Update(shipment);
            await _context.SaveChangesAsync();
        }
    }


}