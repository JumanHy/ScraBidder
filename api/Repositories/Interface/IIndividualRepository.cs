using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Repositories.Interfaces
{
  public interface IIndividualRepository
  {

    Task<Individual> AddAsync(Individual individual);
    Task<Individual> GetByEmailAsync(string email);
    Task<Individual> GetByPhoneNumberAsync(string phoneNumber);

  }
}


