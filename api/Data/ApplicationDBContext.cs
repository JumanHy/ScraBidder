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







            // Define currentDate (now)
            var currentDate = DateTime.UtcNow;

            // Admin users
            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "1",
                    UserName = "admin1",
                    Email = "admin1@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,



                },
                new ApplicationUser
                {
                    Id = "2",
                    UserName = "admin2",
                    Email = "admin2@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,


                },
                new ApplicationUser
                {
                    Id = "3",
                    UserName = "admin3",
                    Email = "admin3@example.com",
                    Status = AccountStatus.Blocked,
                    CreatedAt = currentDate,

                },
                new ApplicationUser
                {
                    Id = "4",
                    UserName = "admin4",
                    Email = "admin4@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                },
                new ApplicationUser
                {
                    Id = "5",
                    UserName = "admin5",
                    Email = "admin5@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,

                }
            );

            // Business users
            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "6",
                    UserName = "business1",
                    Email = "business1@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                },
                new ApplicationUser
                {
                    Id = "7",
                    UserName = "business2",
                    Email = "business2@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,

                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "8",
                    UserName = "business3",
                    Email = "business3@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "9",
                    UserName = "business4",
                    Email = "business4@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "10",
                    UserName = "business5",
                    Email = "business5@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,

                }
            );

            // Individual users
            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser
                {
                    Id = "11",
                    UserName = "individual1",
                    Email = "individual1@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "12",
                    UserName = "individual2",
                    Email = "individual2@example.com",
                    Status = AccountStatus.Blocked,
                    CreatedAt = currentDate,

                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "13",
                    UserName = "individual3",
                    Email = "individual3@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                },
                new ApplicationUser
                {
                    Id = "14",
                    UserName = "individual4",
                    Email = "individual4@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,
                },
                new ApplicationUser
                {
                    Id = "15",
                    UserName = "individual5",
                    Email = "individual5@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,

                }
            );

            // Seed corresponding Business records
            builder.Entity<Business>().HasData(
                new Business
                {
                    BusinessId = 1,
                    UserId = "6",
                    BusinessName = "Business 1",
                    BusinessType = BusinessType.Seller,
                    BusinessEmail = "business1@example.com",
                    BusinessPhoneNumber = "123-456-7890",
                    RegistrationNumber = "REG12345",
                    PrimaryPhoneNumber = "123-456-7890",
                    PrimaryContactFirstName = "John",
                    PrimaryContactLastName = "Doe",
                    PrimaryJobTitle = "CEO",
                    PrimaryContactEmail = "contact@business1.com",
                    Address = "123 Main St, Amman, Jordan"
                }, new Business
                {
                    BusinessId = 2,
                    UserId = "7",
                    BusinessName = "Business 2",
                    BusinessType = BusinessType.Seller,
                    BusinessEmail = "business2@example.com",
                    BusinessPhoneNumber = "223-456-7890",
                    RegistrationNumber = "REG22345",
                    PrimaryPhoneNumber = "223-456-7890",
                    PrimaryContactFirstName = "Alice",
                    PrimaryContactLastName = "Smith",
                    PrimaryJobTitle = "Manager",
                    PrimaryContactEmail = "contact@business2.com",
                    Address = "123 Main St, Amman, Jordan"
                },
            new Business
            {
                BusinessId = 3,
                UserId = "8",
                BusinessName = "Business 3",
                BusinessType = BusinessType.Buyer,
                BusinessEmail = "business3@example.com",
                BusinessPhoneNumber = "323-456-7890",
                RegistrationNumber = "REG32345",
                PrimaryPhoneNumber = "323-456-7890",
                PrimaryContactFirstName = "Mark",
                PrimaryContactLastName = "Brown",
                PrimaryJobTitle = "Owner",
                PrimaryContactEmail = "contact@business3.com",
                Address = "123 Main St, Amman, Jordan"
            },
            new Business
            {
                BusinessId = 4,
                UserId = "9",
                BusinessName = "Business 4",
                BusinessType = BusinessType.Seller,
                BusinessEmail = "business4@example.com",
                BusinessPhoneNumber = "423-456-7890",
                RegistrationNumber = "REG42345",
                PrimaryPhoneNumber = "423-456-7890",
                PrimaryContactFirstName = "Linda",
                PrimaryContactLastName = "Johnson",
                PrimaryJobTitle = "CEO",
                PrimaryContactEmail = "contact@business4.com",
                Address = "123 Main St, Amman, Jordan"
            },
            new Business
            {
                BusinessId = 5,
                UserId = "10",
                BusinessName = "Business 5",
                BusinessType = BusinessType.Seller,
                BusinessEmail = "business5@example.com",
                BusinessPhoneNumber = "523-456-7890",
                RegistrationNumber = "REG52345",
                PrimaryPhoneNumber = "523-456-7890",
                PrimaryContactFirstName = "Sarah",
                PrimaryContactLastName = "Williams",
                PrimaryJobTitle = "Manager",
                PrimaryContactEmail = "contact@business5.com",
                Address = "123 Main St, Amman, Jordan"
            }
            // Add other businesses here...
            );

            // Seed corresponding Individual records
            builder.Entity<Individual>().HasData(
                new Individual
                {
                    IndividualId = 1,
                    UserId = "11",
                    FirstName = "Alice",
                    LastName = "Williams",
                    PhoneNumber = "987-654-3210",
                    Address = "{\"street\":\"123 Main St\",\"city\":\"Amman\",\"country\":\"Jordan\"}"
                }, new Individual
                {
                    IndividualId = 2,
                    UserId = "12",
                    FirstName = "Bob",
                    LastName = "Johnson",
                    PhoneNumber = "987-654-3220",
                    Address = "{\"street\":\"456 Oak St\",\"city\":\"Amman\",\"country\":\"Jordan\"}",
                    Image = "profilepic2.jpg"
                },
            new Individual
            {
                IndividualId = 3,
                UserId = "13",
                FirstName = "Charlie",
                LastName = "Smith",
                PhoneNumber = "987-654-3230",
                Address = "{\"street\":\"789 Pine St\",\"city\":\"Amman\",\"country\":\"Jordan\"}",
                Image = "profilepic3.jpg"
            },
            new Individual
            {
                IndividualId = 4,
                UserId = "14",
                FirstName = "David",
                LastName = "Davis",
                PhoneNumber = "987-654-3240",
                Address = "{\"street\":\"123 Birch St\",\"city\":\"Amman\",\"country\":\"Jordan\"}",
                Image = "profilepic4.jpg"
            },
            new Individual
            {
                IndividualId = 5,
                UserId = "15",
                FirstName = "Eva",
                LastName = "Martin",
                PhoneNumber = "987-654-3250",
                Address = "{\"street\":\"456 Maple St\",\"city\":\"Amman\",\"country\":\"Jordan\"}",
                Image = "profilepic5.jpg"
            }
            );




            // Seed Auctions
            builder.Entity<Auction>().HasData(
         new Auction
         {
             AuctionId = 1,
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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
             SellerId = "4",
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


