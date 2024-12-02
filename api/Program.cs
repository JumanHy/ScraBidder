using System.Text.Json.Serialization;
using api.Controllers;
using api.Data;
using api.Interfaces;
using api.Repositories;
using api.Services;
using api.Interfaces;
using api.Models;
using api.Repositories.Implementations;
using api.Repositories.Interfaces;
using api.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);


        builder.Services.AddScoped<PaymentService>();
        builder.Services.AddScoped<ITransactionHistoryRepository, TransactionHistoryRepository>();
        builder.Services.AddHostedService<AuctionPaymentHandlerService>();

        // Add services to the container
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddDbContext<ApplicationDBContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp",
                policy => policy.WithOrigins("http://localhost:5173") // Allow your React app's URL
                                .AllowAnyHeader()
                                .AllowAnyMethod());
        });
        builder.Services.AddHttpClient<PayPalService>();
        builder.Logging.ClearProviders(); // Clears default providers for clean setup
        builder.Logging.AddConsole();
        // Add support for controllers
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });



        // Add services to the container.
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Configure ApplicationDBContext with SQL Server
        builder.Services.AddDbContext<ApplicationDBContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        // Configure Identity with ApplicationUser and IdentityRole
        builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;
        })
        .AddEntityFrameworkStores<ApplicationDBContext>()
        .AddDefaultTokenProviders();

        // Add Authentication and Authorization
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWT:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigninKey"])
                    )
                };
            });

        builder.Services.AddAuthorization();

        // Enable CORS (Add CORS Policy)
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
            {
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyHeader()// Allow any origin
                      .AllowAnyMethod();  // Allow any HTTP method (GET, POST, etc.)
                                          // Allow any headers
            });
        });

        // Add Controllers (for MVC support)
        builder.Services.AddControllers();

        // Scoped services
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IIndividualRepository, IndividualRepository>();
        builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IUserSettingService, UserSettingService>();

        // Build the application
        var app = builder.Build();

        // Configure the HTTP request pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();

        // Use CORS middleware to allow requests from front-end (React app)
        app.UseCors("AllowReactApp");

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        // Map controllers
        app.MapControllers();

        // Run the application
        app.Run();
    }
}
