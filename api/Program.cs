using System.Text.Json.Serialization;
using api.Controllers;
using api.Data;
using api.Interfaces;
using api.Repositories;
using api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<ITransactionHistoryRepository, TransactionHistoryRepository>();
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


var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");
app.UseRouting();
app.MapControllers();

app.Run();
