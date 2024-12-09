using System.Text;
using System.Text.Json.Serialization;
using api.Data;
using api.Hubs;
using api.Interfaces;
using api.Models;
using api.Repositories;
using api.Repositories.Implementations;
using api.Repositories.Interface;
using api.Repositories.Interfaces;
using api.Repository;
using api.Service;
using api.Services;
using api.Events; // Ensure Event namespaces are included
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

internal partial class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // SignalR setup
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
        builder.Services.AddScoped<WatchListService>();
        builder.Services.AddScoped<IWatchListRepository, WatchListRepository>();
        builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
        builder.Services.AddScoped<IShipmentService, ShipmentService>();

        builder.Services.AddScoped<NotificationService>();
        builder.Services.AddScoped<EventDispatcher>();
        // Register Event Handlers for Auction-related events
        builder.Services.AddScoped<IEventHandler<AuctionStatusChangedEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<TransactionEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<ShipmentEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<UserStatusUpdatedEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<NewBiddingEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<AuctionStartedEvent>, NotificationHandler>();
        builder.Services.AddScoped<IEventHandler<AuctionEndedEvent>, NotificationHandler>();


        // Configure Entity Framework and Database
        builder.Services.AddDbContext<ApplicationDBContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        // Add HttpClient for external API calls
        builder.Services.AddHttpClient<PayPalService>();

        // Configure logging
        builder.Logging.ClearProviders();
        builder.Logging.AddConsole();

        // Configure Controllers and JSON options
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

        // Configure Identity
        // Configure Identity
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

        // Authentication and JWT Bearer setup
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
                    // Extract token from the query string for SignalR
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

        // Swagger setup
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
            option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });

        // CORS setup for React App
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


        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            try
            {
                await AdminSeeder.SeedAdminUser(services);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error seeding admin user: {ex.Message}");
            }
        }


        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
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
        app.MapHub<BiddingHub>("/biddingHub");
        app.Run();
    }

}
