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
                    SellerId = 2, // Individual User
                    Title = "Recycled Aluminum Sheets",
                    Description = "High-quality recycled aluminum sheets.",
                    CategoryId = 1, // Aluminum
                    Images = "[\"image1.jpg\", \"image2.jpg\"]", // Example JSON
                    AuctionStatus = AuctionStatus.approved,
                    StartingBid = 100.00m,
                    CreatedAt = DateTime.UtcNow,
                    StartingTime = DateTime.UtcNow,
                    EndingTime = DateTime.UtcNow.AddDays(7),
                    Address = "{\"city\": \"New York\", \"state\": \"NY\"}", // Example JSON
                    Condition = Condition.New,
                    Quantity = 10
                },
                new Auction
                {
                    AuctionId = 2,
                    SellerId = 3, // Business User
                    Title = "Copper Wires",
                    Description = "Durable copper wires for electrical projects.",
                    CategoryId = 2, // Copper
                    Images = "[\"image3.jpg\", \"image4.jpg\"]",
                    AuctionStatus = AuctionStatus.approved,
                    StartingBid = 200.00m,
                    CreatedAt = DateTime.UtcNow,
                    StartingTime = DateTime.UtcNow.AddDays(2),
                    EndingTime = DateTime.UtcNow.AddDays(8),
                    Address = "{\"city\": \"Los Angeles\", \"state\": \"CA\"}",
                    Condition = Condition.mixed,
                    Quantity = 20
                }
            );
        }



    }
}