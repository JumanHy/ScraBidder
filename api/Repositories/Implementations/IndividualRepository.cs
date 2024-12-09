using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Implementations
{
    public class IndividualRepository : IIndividualRepository
    {
        private readonly ApplicationDBContext _context;

        public IndividualRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Individual> AddAsync(Individual individual)
        {
            await _context.Individuals.AddAsync(individual);
            await _context.SaveChangesAsync();
            return individual;
        }

        // Fetch individual by the email of the associated User
        public async Task<Individual> GetByEmailAsync(string email)
        {
            return await _context.Individuals
                .Include(individual => individual.User)  // Eager load the related User entity
                .FirstOrDefaultAsync(individual => individual.User.Email == email);  // Filter by the Email of the User
        }

        // Fetch individual by the phone number
        public async Task<Individual> GetByPhoneNumberAsync(string phoneNumber)
        {
            return await _context.Individuals
                .FirstOrDefaultAsync(individual => individual.PhoneNumber == phoneNumber);
        }
    }
}
