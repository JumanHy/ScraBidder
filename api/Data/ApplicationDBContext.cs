using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public DbSet<Models.Action> Actions { get; set; }
        public DbSet<BiddingHistory> BiddingHistory { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Individual> Individuals { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<TrafficLog> TrafficLog { get; set; }
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
        }


    }
}