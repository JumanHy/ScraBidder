using System.Text;
using System.Text.Json.Serialization;
using api.Data;
using api.Hubs;
using api.Interfaces;
using api.Models;
using api.Repositories;
using api.Repositories.Implementations;
using api.Repositories.Interfaces;
using api.Repository;
using api.Service;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddSignalR();
        builder.Services.AddSingleton<IUserIdProvider, NameUserIdProvider>();
        // Register services here
        builder.Services.AddScoped<PaymentService>();
        builder.Services.AddScoped<ITransactionHistoryRepository, TransactionHistoryRepository>();
        builder.Services.AddHostedService<AuctionPaymentHandlerService>();
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IIndividualRepository, IndividualRepository>();
        builder.Services.AddScoped<IBusinessRepository, BusinessRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IUserSettingService, UserSettingService>();
        builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();
        builder.Services.AddScoped<IBiddingHistoryRepository, BiddingHistoryRepository>();
        builder.Services.AddScoped<NotificationService>();

        builder.Services.AddDbContext<ApplicationDBContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        builder.Services.AddHttpClient<PayPalService>();
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

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

        builder.Services.AddAuthentication(options =>
 {
     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
 })
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
                 Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigninKey"])
             )
         };

         options.Events = new JwtBearerEvents
         {
             OnMessageReceived = context =>
             {
                 // Extract token from the query string
                 var accessToken = context.Request.Query["access_token"];
                 var path = context.HttpContext.Request.Path;
                 if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/notificationHub"))
                 {
                     context.Token = accessToken;
                 }
                 return Task.CompletedTask;


             }
         };

     });


        builder.Services.AddAuthorization();

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
                policy.WithOrigins("http://localhost:5173")
                      .AllowAnyHeader()
                      .AllowAnyMethod()
                      .AllowCredentials());
        });



        // Build the application
        var app = builder.Build();

        // Configure middleware and HTTP pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseCors("AllowReactApp");

        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        app.MapHub<NotificationHub>("/notificationHub");
        app.Run();
    }
}
