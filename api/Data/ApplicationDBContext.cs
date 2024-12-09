using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Collections.Generic;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> dbContextOptions)
            : base(dbContextOptions)
        {
        }

        // Define DbSets for your models
        public DbSet<Auction> Auctions { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<Shipment> Shipments { get; set; }
        public DbSet<Models.Action> Actions { get; set; }
        public DbSet<BiddingHistory> BiddingHistory { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Individual> Individuals { get; set; }

        public DbSet<WatchList> WatchList { get; set; }
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Category> Categories { get; set; }
        public object CompanyServices { get; internal set; }
        public IEnumerable<object> ApplicationUsers { get; internal set; }
        public object BusinessContacts { get; internal set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<Shipment>()
                .HasOne(s => s.Seller)
                .WithMany() // Assuming no navigation property on Seller side
                .HasForeignKey(s => s.SellerId)
                .OnDelete(DeleteBehavior.Restrict); // Specify Restrict or NoAction

            builder.Entity<Shipment>()
                .HasOne(s => s.Buyer)
                .WithMany() // Assuming no navigation property on Buyer side
                .HasForeignKey(s => s.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Shipment>()
                .HasOne(s => s.Auction)
                .WithMany(a => a.Shipments) // Assuming Auction has a collection of Shipments
                .HasForeignKey(s => s.AuctionId)
                .OnDelete(DeleteBehavior.Restrict);
            // Seed IdentityRoles
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "Individual",
                    NormalizedName = "INDIVIDUAL"
                },
                new IdentityRole
                {
                    Name = "Business",
                    NormalizedName = "BUSINESS"
                }
            };




            builder.Entity<IdentityRole>().HasData(roles);

            // Configure BiddingHistory → ApplicationUser (BidderId relationship)
            builder.Entity<BiddingHistory>()
                .HasOne(bh => bh.Bidder)
                .WithMany() // No back-reference in ApplicationUser
                .HasForeignKey(bh => bh.BidderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure Auction → ApplicationUser (SellerId relationship)
            builder.Entity<Auction>()
                .HasOne(a => a.Seller)
                .WithMany()
                .HasForeignKey(a => a.SellerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure BiddingHistory → Auction (AuctionId relationship)
            builder.Entity<BiddingHistory>()
                .HasOne(bh => bh.Auction)
                .WithMany(a => a.Biddings)
                .HasForeignKey(bh => bh.AuctionId)
                .OnDelete(DeleteBehavior.Cascade); // Allow cascade here

            // Configure enum properties to be stored as strings
            builder.Entity<ApplicationUser>()
                .Property(u => u.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (AccountStatus)Enum.Parse(typeof(AccountStatus), v));

            builder.Entity<Auction>()
                .Property(a => a.AuctionStatus)
                .HasConversion(
                    v => v.ToString(),
                    v => (AuctionStatus)Enum.Parse(typeof(AuctionStatus), v));

            builder.Entity<Auction>()
                .Property(a => a.Condition)
                .HasConversion(
                    v => v.ToString(),
                    v => (Condition)Enum.Parse(typeof(Condition), v));

            builder.Entity<TransactionHistory>()
                .Property(a => a.TransactionType)
                .HasConversion(
                    v => v.ToString(),
                    v => (TransactionType)Enum.Parse(typeof(TransactionType), v));

            builder.Entity<TransactionHistory>()
    .Property(a => a.TransactionPurpose)
    .HasConversion(
        v => v.ToString(),
        v => (TransactionPurpose)Enum.Parse(typeof(TransactionPurpose), v));

            // Seed Roles


            // Seed Categories
            builder.Entity<Category>().HasData(
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
            // Configure ApplicationUser → Business (One-to-One)
            builder.Entity<ApplicationUser>()
                .HasOne(u => u.Business)
                .WithOne(b => b.User)
                .HasForeignKey<Business>(b => b.UserId);

            // Configure ApplicationUser → Individual (One-to-One)
            builder.Entity<ApplicationUser>()
                .HasOne(u => u.Individual)
                .WithOne(i => i.User)
                .HasForeignKey<Individual>(i => i.UserId);

            builder.Entity<ApplicationUser>()
            .Property(u => u.Status)
            .HasConversion(
                v => v.ToString(), // Convert enum to string when saving
                v => (AccountStatus)Enum.Parse(typeof(AccountStatus), v) // Convert string back to enum when reading
            );


        }



    }
}


