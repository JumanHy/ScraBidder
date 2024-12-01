using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Auction> Auctions { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Models.Action> Actions { get; set; }
        public DbSet<BiddingHistory> BiddingHistory { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Individual> Individuals { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<WatchList> WatchList { get; set; }
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Category> Categories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure BiddingHistory → Users (BidderId relationship)
            modelBuilder.Entity<BiddingHistory>()
                .HasOne(bh => bh.Bidder) // Navigation property in BiddingHistory
                .WithMany()              // No back-reference in Users
                .HasForeignKey(bh => bh.BidderId)
                .OnDelete(DeleteBehavior.Restrict); // Use SetNull or Restrict as needed

            // Configure Auctions → Users (SellerId relationship)
            modelBuilder.Entity<Auction>()
                .HasOne(a => a.Seller)  // Navigation property in Auctions
                .WithMany()             // No back-reference in Users
                .HasForeignKey(a => a.SellerId)
                .OnDelete(DeleteBehavior.Restrict); // Prevent cascading delete

            // Example for other relationships that may involve cascading delete
            modelBuilder.Entity<BiddingHistory>()
                .HasOne(bh => bh.Auction) // Navigation property to Auctions
                .WithMany(a => a.Biddings)
                .HasForeignKey(bh => bh.AuctionId)
                .OnDelete(DeleteBehavior.Cascade); // Allow cascade here

            // Configure enum properties to be stored as strings
            modelBuilder.Entity<User>()
                .Property(u => u.AccountStatus)
                .HasConversion(
                    v => v.ToString(),
                    v => (AccountStatus)Enum.Parse(typeof(AccountStatus), v));

            modelBuilder.Entity<Auction>()
                .Property(a => a.AuctionStatus)
                .HasConversion(
                    v => v.ToString(),
                    v => (AuctionStatus)Enum.Parse(typeof(AuctionStatus), v));

            modelBuilder.Entity<Auction>()
                .Property(a => a.Condition)
                .HasConversion(
                    v => v.ToString(),
                    v => (Condition)Enum.Parse(typeof(Condition), v));

            modelBuilder.Entity<TransactionHistory>()
                .Property(a => a.TransactionType)
                .HasConversion(
                    v => v.ToString(),
                    v => (TransactionType)Enum.Parse(typeof(TransactionType), v));

            modelBuilder.Entity<TransactionHistory>()
    .Property(a => a.TransactionPurpose)
    .HasConversion(
        v => v.ToString(),
        v => (TransactionPurpose)Enum.Parse(typeof(TransactionPurpose), v));

            // Seed Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "Individual" },
                new Role { RoleId = 3, RoleName = "Business" }
            );

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Aluminum" },
                new Category { CategoryId = 2, CategoryName = "Copper" },
                new Category { CategoryId = 3, CategoryName = "Plastic" },
                new Category { CategoryId = 4, CategoryName = "Iron" },
                new Category { CategoryId = 5, CategoryName = "Stainless Steel" },
                new Category { CategoryId = 6, CategoryName = "Wood" },
                new Category { CategoryId = 7, CategoryName = "Glass" },
                new Category { CategoryId = 8, CategoryName = "Paper" },
                new Category { CategoryId = 9, CategoryName = "Rubber" },
                new Category { CategoryId = 10, CategoryName = "Textile" },
                new Category { CategoryId = 11, CategoryName = "Ceramic" }
            );

            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    RoleId = 1,
                    Email = "admin@example.com",
                    AccountStatus = AccountStatus.Approved,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserId = 2,
                    RoleId = 2,
                    Email = "individual@example.com",
                    AccountStatus = AccountStatus.Approved,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserId = 3,
                    RoleId = 2,
                    Email = "individual2@example.com",
                    AccountStatus = AccountStatus.Approved,
                    CreatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserId = 4,
                    RoleId = 3,
                    Email = "business@example.com",
                    AccountStatus = AccountStatus.Approved,
                    CreatedAt = DateTime.UtcNow
                }
            );

            // Seed Auctions
            modelBuilder.Entity<Auction>().HasData(
         new Auction
         {
             AuctionId = 1,
             SellerId = 4,
             Title = "Aluminum Scrap Bundle",
             Description = "A collection of high-grade aluminum scraps.",
             CategoryId = 1, // Aluminum
             Images = "[\"aluminum1.jpg\", \"aluminum2.jpg\"]",
             AuctionStatus = AuctionStatus.Started,
             StartingBid = 500.00m,
             CurrentBid = 650.00m,
             ReservePrice = 800.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-10),
             StartingTime = DateTime.UtcNow.AddDays(-5),
             EndingTime = DateTime.UtcNow.AddDays(5),
             Address = "{\"city\": \"New York\", \"state\": \"NY\"}",
             Condition = Condition.Mixed,
             Quantity = 100,
         },
         new Auction
         {
             AuctionId = 2,
             SellerId = 4,
             Title = "Copper Wiring Scrap",
             Description = "Various grades of copper wiring ready for recycling.",
             CategoryId = 2, // Copper
             Images = "[\"copper1.jpg\", \"copper2.jpg\"]",
             AuctionStatus = AuctionStatus.Ended,
             StartingBid = 1000.00m,
             CurrentBid = 1200.00m,
             ReservePrice = 1500.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-30),
             StartingTime = DateTime.UtcNow.AddDays(-25),
             EndingTime = DateTime.UtcNow.AddDays(-15),
             Address = "{\"city\": \"Los Angeles\", \"state\": \"CA\"}",
             Condition = Condition.Used,
             Quantity = 200,
         },
         new Auction
         {
             AuctionId = 3,
             SellerId = 4,
             Title = "Plastic Waste",
             Description = "Recyclable plastic waste from industrial sources.",
             CategoryId = 3, // Plastic
             Images = "[\"plastic1.jpg\"]",
             AuctionStatus = AuctionStatus.Started,
             StartingBid = 300.00m,
             CurrentBid = 450.00m,
             ReservePrice = 600.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-5),
             StartingTime = DateTime.UtcNow.AddDays(-3),
             EndingTime = DateTime.UtcNow.AddDays(7),
             Address = "{\"city\": \"Houston\", \"state\": \"TX\"}",
             Condition = Condition.New,
             Quantity = 50,
         },
         new Auction
         {
             AuctionId = 4,
             SellerId = 4,
             Title = "Iron Sheets",
             Description = "Scrap iron sheets from old construction projects.",
             CategoryId = 4, // Iron
             Images = "[\"iron1.jpg\", \"iron2.jpg\"]",
             AuctionStatus = AuctionStatus.Ended,
             StartingBid = 700.00m,
             CurrentBid = 800.00m,
             ReservePrice = 1000.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-20),
             StartingTime = DateTime.UtcNow.AddDays(-18),
             EndingTime = DateTime.UtcNow.AddDays(-10),
             Address = "{\"city\": \"Chicago\", \"state\": \"IL\"}",
             Condition = Condition.Used,
             Quantity = 300,
         },
         new Auction
         {
             AuctionId = 5,
             SellerId = 4,
             Title = "Stainless Steel Scraps",
             Description = "Premium-grade stainless steel scrap materials.",
             CategoryId = 5, // Stainless Steel
             Images = "[\"steel1.jpg\", \"steel2.jpg\"]",
             AuctionStatus = AuctionStatus.Started,
             StartingBid = 1500.00m,
             CurrentBid = 1600.00m,
             ReservePrice = 2000.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-8),
             StartingTime = DateTime.UtcNow.AddDays(-7),
             EndingTime = DateTime.UtcNow.AddDays(3),
             Address = "{\"city\": \"Dallas\", \"state\": \"TX\"}",
             Condition = Condition.New,
             Quantity = 150,
         },
         new Auction
         {
             AuctionId = 6,
             SellerId = 4,
             Title = "Wooden Pallets",
             Description = "Recyclable wooden pallets from warehouses.",
             CategoryId = 6, // Wood
             Images = "[\"wood1.jpg\", \"wood2.jpg\"]",
             AuctionStatus = AuctionStatus.Ended,
             StartingBid = 200.00m,
             CurrentBid = 250.00m,
             ReservePrice = 300.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-50),
             StartingTime = DateTime.UtcNow.AddDays(-48),
             EndingTime = DateTime.UtcNow.AddDays(-40),
             Address = "{\"city\": \"Atlanta\", \"state\": \"GA\"}",
             Condition = Condition.Mixed,
             Quantity = 500,
         },
         new Auction
         {
             AuctionId = 7,
             SellerId = 4,
             Title = "Glass Shards",
             Description = "Glass shards from old construction materials.",
             CategoryId = 7, // Glass
             Images = "[\"glass1.jpg\"]",
             AuctionStatus = AuctionStatus.Started,
             StartingBid = 400.00m,
             CurrentBid = 550.00m,
             ReservePrice = 700.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-10),
             StartingTime = DateTime.UtcNow.AddDays(-7),
             EndingTime = DateTime.UtcNow.AddDays(2),
             Address = "{\"city\": \"Phoenix\", \"state\": \"AZ\"}",
             Condition = Condition.Used,
             Quantity = 250,
         },
         new Auction
         {
             AuctionId = 8,
             SellerId = 4,
             Title = "Paper Waste",
             Description = "Paper waste from old documents and magazines.",
             CategoryId = 8, // Paper
             Images = "[\"paper1.jpg\"]",
             AuctionStatus = AuctionStatus.Ended,
             StartingBid = 100.00m,
             CurrentBid = 150.00m,
             ReservePrice = 200.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-25),
             StartingTime = DateTime.UtcNow.AddDays(-20),
             EndingTime = DateTime.UtcNow.AddDays(-15),
             Address = "{\"city\": \"Seattle\", \"state\": \"WA\"}",
             Condition = Condition.Mixed,
             Quantity = 1000,
         },
         new Auction
         {
             AuctionId = 9,
             SellerId = 4,
             Title = "Rubber Tires",
             Description = "Used rubber tires ready for recycling.",
             CategoryId = 9, // Rubber
             Images = "[\"rubber1.jpg\"]",
             AuctionStatus = AuctionStatus.Started,
             StartingBid = 300.00m,
             CurrentBid = 350.00m,
             ReservePrice = 500.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-5),
             StartingTime = DateTime.UtcNow.AddDays(-4),
             EndingTime = DateTime.UtcNow.AddDays(6),
             Address = "{\"city\": \"San Francisco\", \"state\": \"CA\"}",
             Condition = Condition.Used,
             Quantity = 400,
         },
         new Auction
         {
             AuctionId = 10,
             SellerId = 4,
             Title = "Ceramic Tiles",
             Description = "Scrap ceramic tiles from construction sites.",
             CategoryId = 11, // Ceramic
             Images = "[\"ceramic1.jpg\"]",
             AuctionStatus = AuctionStatus.Ended,
             StartingBid = 500.00m,
             CurrentBid = 600.00m,
             ReservePrice = 700.00m,
             CreatedAt = DateTime.UtcNow.AddDays(-30),
             StartingTime = DateTime.UtcNow.AddDays(-28),
             EndingTime = DateTime.UtcNow.AddDays(-18),
             Address = "{\"city\": \"Denver\", \"state\": \"CO\"}",
             Condition = Condition.Used,
             Quantity = 50,
         }
     );
        }



    }
}