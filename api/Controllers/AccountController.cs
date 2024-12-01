using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using api.Dtos;
using api.Models;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Repositories.Implementations;
using api.Repositories.Interfaces;

namespace api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<ApplicationUser> _signinManager;
        private readonly IIndividualRepository _individualRepo;
        private readonly IBusinessRepository _businessRepo;

        public UsersController(
            UserManager<ApplicationUser> userManager,
            ITokenService tokenService,
            SignInManager<ApplicationUser> signInManager,
            IIndividualRepository individualRepo,
            IBusinessRepository businessRepo)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
            _individualRepo = individualRepo;
            _businessRepo = businessRepo;
        }

        // Login endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Find user by email
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == loginDto.Email.ToLower());
            if (user == null)
                return Unauthorized("Invalid email or password.");

            // Check password
            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Invalid email or password.");

            // Generate token
            return Ok(new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            });
        }

        // Register Individual User
        [HttpPost("register/individual")]
        public async Task<IActionResult> RegisterIndividual([FromBody] IndividualRegisterDto individualRegisterDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = individualRegisterDto.Email,
                Email = individualRegisterDto.Email,
            };

            var createResult = await _userManager.CreateAsync(user, individualRegisterDto.Password);

            if (!createResult.Succeeded)
                return BadRequest(createResult.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Individual");

            if (!roleResult.Succeeded)
            {
                // Rollback user creation if role assignment fails
                await _userManager.DeleteAsync(user);
                return StatusCode(500, roleResult.Errors);
            }

            var individualModel = new Individual
            {
                UserId = user.Id,
                FirstName = individualRegisterDto.FirstName,
                LastName = individualRegisterDto.LastName,
                PhoneNumber = individualRegisterDto.PhoneNumber,

            };
            var createdIndividual = await _individualRepo.AddAsync(individualModel);

            if (createdIndividual == null)
            {
                return BadRequest("The account is not created");
            }

            return Ok(new NewUserDto
            {

                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            });
        }

        // Register Business User
        [HttpPost("register/business")]
        public async Task<IActionResult> RegisterBusiness([FromBody] BusinessRegisterDto businessRegisterDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new ApplicationUser
            {
                UserName = businessRegisterDto.Email,
                Email = businessRegisterDto.Email,
                PhoneNumber = businessRegisterDto.PrimaryPhoneNumber
            };

            var createResult = await _userManager.CreateAsync(user, businessRegisterDto.Password);
            if (!createResult.Succeeded)
                return BadRequest(createResult.Errors);

            var roleResult = await _userManager.AddToRoleAsync(user, "Business");
            if (!roleResult.Succeeded)
            {
                // Rollback user creation if role assignment fails
                await _userManager.DeleteAsync(user);
                return StatusCode(500, roleResult.Errors);
            }
            var businessModel = new Business
            {
                UserId = user.Id,

                BusinessName = businessRegisterDto.BusinessName,
                BusinessType = businessRegisterDto.BusinessType,
                BusinessEmail = businessRegisterDto.BusinessEmail,
                BusinessPhoneNumber = businessRegisterDto.BusinessNumber,
                CompanyVision = businessRegisterDto.CompanyVision,
                LinkedIn = businessRegisterDto.LinkedIn,
                RegistrationNumber = businessRegisterDto.RegistrationNumber,
                Address = businessRegisterDto.Address,
                PrimaryPhoneNumber = businessRegisterDto.PrimaryPhoneNumber,
                PrimaryContactFirstName = businessRegisterDto.PrimaryContactFirstName,
                PrimaryContactLastName = businessRegisterDto.PrimaryContactLastName,
                PrimaryJobTitle = businessRegisterDto.PrimaryJobTitle,
                PrimaryContactEmail = businessRegisterDto.PrimaryContactEmail,

            };
            var createdBusiness = await _businessRepo.AddAsync(businessModel);

            if (createdBusiness == null)
            {
                return BadRequest("The account is not created");
            }
            return Ok(new NewUserDto
            {
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            });
        }
    }
}