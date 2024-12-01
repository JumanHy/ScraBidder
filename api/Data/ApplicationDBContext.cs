using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using api.Models;
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
        public DbSet<Models.Action> Actions { get; set; }
        public DbSet<BiddingHistory> BiddingHistory { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Individual> Individuals { get; set; }
        public DbSet<TrafficLog> TrafficLog { get; set; }
        public DbSet<WatchList> WatchList { get; set; }
        public DbSet<TransactionHistory> TransactionHistory { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Category> Categories { get; set; }
        public object CompanyServices { get; internal set; }

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
                .OnDelete(DeleteBehavior.Cascade);

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




            // Convert UserType enum to string in the database
            builder.Entity<ApplicationUser>()
                .Property(u => u.UserType)
                .HasConversion(
                    v => v.ToString(), // Convert enum to string when saving
                    v => (UserType)Enum.Parse(typeof(UserType), v) // Convert string back to enum when reading
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
                    UserType = UserType.Admin 
                    
                    
                },
                new ApplicationUser
                {
                    Id = "2",
                    UserName = "admin2",
                    Email = "admin2@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Admin 
                    
                },
                new ApplicationUser
                {
                    Id = "3",
                    UserName = "admin3",
                    Email = "admin3@example.com",
                    Status = AccountStatus.Blocked,
                    CreatedAt = currentDate,
                    UserType = UserType.Admin // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "4",
                    UserName = "admin4",
                    Email = "admin4@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Admin // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "5",
                    UserName = "admin5",
                    Email = "admin5@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,
                    UserType = UserType.Admin // Use enum value instead of string
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
                    UserType = UserType.Business // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "7",
                    UserName = "business2",
                    Email = "business2@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,
                    UserType = UserType.Business
                      // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "8",
                    UserName = "business3",
                    Email = "business3@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Business
                     // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "9",
                    UserName = "business4",
                    Email = "business4@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Business
                      // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "10",
                    UserName = "business5",
                    Email = "business5@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,
                    UserType = UserType.Business
                    // Use enum value instead of string
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
                    UserType = UserType.Individual ,
                    // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "12",
                    UserName = "individual2",
                    Email = "individual2@example.com",
                    Status = AccountStatus.Blocked,
                    CreatedAt = currentDate,
                    UserType = UserType.Individual,
                      // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "13",
                    UserName = "individual3",
                    Email = "individual3@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Individual
                     // Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "14",
                    UserName = "individual4",
                    Email = "individual4@example.com",
                    Status = AccountStatus.Pending,
                    CreatedAt = currentDate,
                    UserType = UserType.Individual// Use enum value instead of string
                },
                new ApplicationUser
                {
                    Id = "15",
                    UserName = "individual5",
                    Email = "individual5@example.com",
                    Status = AccountStatus.Active,
                    CreatedAt = currentDate,
                    UserType = UserType.Individual // Use enum value instead of string
                }
            );

            // Seed corresponding Business records
            builder.Entity<Business>().HasData(
                new Business
                {
                    BusinessId = 1,
                    UserId = "6",
                    BusinessName = "Business 1",
                    BusinessType = "seller",
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
                    BusinessType = "seller",
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
            BusinessType = "buyer",
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
            BusinessType = "seller",
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
            BusinessType = "buyer",
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
        }
        // Add other individuals here...

    }
}

