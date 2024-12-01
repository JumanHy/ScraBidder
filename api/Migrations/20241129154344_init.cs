using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Actions",
                columns: table => new
                {
                    ActionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ActionName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actions", x => x.ActionId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ActionId = table.Column<int>(type: "int", nullable: false),
                    ActionTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLogs", x => x.LogId);
                    table.ForeignKey(
                        name: "FK_ActivityLogs_Actions_ActionId",
                        column: x => x.ActionId,
                        principalTable: "Actions",
                        principalColumn: "ActionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActivityLogs_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    BusinessId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BusinessName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BusinessServices = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BusinessType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessPhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyVision = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LinkedIn = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    RegistrationNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrimaryPhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    PrimaryContactFirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PrimaryContactLastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PrimaryJobTitle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PrimaryContactEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Businesses", x => x.BusinessId);
                    table.ForeignKey(
                        name: "FK_Businesses_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Individuals",
                columns: table => new
                {
                    IndividualId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Individuals", x => x.IndividualId);
                    table.ForeignKey(
                        name: "FK_Individuals_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    NotificationsInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationsId);
                    table.ForeignKey(
                        name: "FK_Notifications_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TrafficLog",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VisitorIp = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    VisitTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrafficLog", x => x.LogId);
                    table.ForeignKey(
                        name: "FK_TrafficLog_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Auctions",
                columns: table => new
                {
                    AuctionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SellerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuctionStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartingBid = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CurrentBid = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ReservePrice = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartingTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndingTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Condition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auctions", x => x.AuctionId);
                    table.ForeignKey(
                        name: "FK_Auctions_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Auctions_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BiddingHistory",
                columns: table => new
                {
                    BidId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    BidderId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BidAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BidTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiddingHistory", x => x.BidId);
                    table.ForeignKey(
                        name: "FK_BiddingHistory_AspNetUsers_BidderId",
                        column: x => x.BidderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BiddingHistory_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionHistory",
                columns: table => new
                {
                    TransactionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PaymentMethodId = table.Column<int>(type: "int", nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionHistory", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_TransactionHistory_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TransactionHistory_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WatchList",
                columns: table => new
                {
                    WatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    UserId1 = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatchList", x => x.WatchId);
                    table.ForeignKey(
                        name: "FK_WatchList_AspNetUsers_UserId1",
                        column: x => x.UserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WatchList_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "062d9c4b-1645-41e4-a260-1d6ada1de783", null, "Business", "BUSINESS" },
                    { "3ec3f6ee-a80e-40a0-b756-ef304d863d47", null, "Individual", "INDIVIDUAL" },
                    { "6e51ab76-5c2f-4f01-b23e-1d4c782f1287", null, "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName", "UserType" },
                values: new object[,]
                {
                    { "1", 0, "f73434b1-bc1b-468e-8ab4-7f9976743390", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "admin1@example.com", false, false, null, null, null, null, null, false, "4c35c675-560a-4a53-885a-cda004e573c0", "Active", false, "admin1", "Admin" },
                    { "10", 0, "ac7adb9a-c1ac-49c9-8223-3cf9683d48c0", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "business5@example.com", false, false, null, null, null, null, null, false, "fd99d23b-562d-4ca7-a842-59bea54d3ca9", "Pending", false, "business5", "Business" },
                    { "11", 0, "08c842fd-2526-40e9-aa4e-e9baffc43d42", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "individual1@example.com", false, false, null, null, null, null, null, false, "0c58da47-0fb1-419b-82ee-d5c8f4c48332", "Active", false, "individual1", "Individual" },
                    { "12", 0, "a5e3980a-e9d8-46cb-8ee8-3d5fac5df424", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "individual2@example.com", false, false, null, null, null, null, null, false, "5b89daf0-4f7a-460d-b865-36126b613ca1", "Blocked", false, "individual2", "Individual" },
                    { "13", 0, "c280fbed-9db1-4141-890e-4c233200ab8b", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "individual3@example.com", false, false, null, null, null, null, null, false, "ac2f7bbb-e6db-456e-aacd-b28ad028945f", "Active", false, "individual3", "Individual" },
                    { "14", 0, "f9e53110-4d01-4224-858f-fb6c05c5f828", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "individual4@example.com", false, false, null, null, null, null, null, false, "88a0b0a9-02b7-4040-b23b-1afbf82156ab", "Pending", false, "individual4", "Individual" },
                    { "15", 0, "31a05bb3-9b39-4aa8-92a4-21969e93c6db", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "individual5@example.com", false, false, null, null, null, null, null, false, "1dc902bf-3b98-4df9-a614-d363789a4f8b", "Active", false, "individual5", "Individual" },
                    { "2", 0, "8483d468-05e8-4766-9a6a-4af1139c7249", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "admin2@example.com", false, false, null, null, null, null, null, false, "ac451d8f-93e0-4248-8545-5f1517317501", "Active", false, "admin2", "Admin" },
                    { "3", 0, "d5653421-3324-4cc5-8d07-3c8b1b1cb9c3", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "admin3@example.com", false, false, null, null, null, null, null, false, "775fa549-6e89-4ca7-9246-58c2e9146a4e", "Blocked", false, "admin3", "Admin" },
                    { "4", 0, "70e647f9-c3de-4a86-b438-6748a2183617", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "admin4@example.com", false, false, null, null, null, null, null, false, "3b0f8012-0a0a-4c28-9060-3a314641aa02", "Active", false, "admin4", "Admin" },
                    { "5", 0, "cb7e39d0-ae6b-4273-818b-0471730cb0d0", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "admin5@example.com", false, false, null, null, null, null, null, false, "52768d85-7d32-4c2d-b0ea-6446c842658d", "Pending", false, "admin5", "Admin" },
                    { "6", 0, "774a2f39-0729-4fec-ab28-cadcc727b02a", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "business1@example.com", false, false, null, null, null, null, null, false, "27d4687f-5819-440b-af21-b991357e0b95", "Active", false, "business1", "Business" },
                    { "7", 0, "cba8385d-2fb1-4099-8a42-e2a662b79451", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "business2@example.com", false, false, null, null, null, null, null, false, "545228a9-cadd-4e25-8dca-33ac69951d87", "Pending", false, "business2", "Business" },
                    { "8", 0, "720de90c-0438-4788-b2fe-b0c04e0cfadc", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "business3@example.com", false, false, null, null, null, null, null, false, "7a7d7b16-4081-4cd7-a94a-3e763b24e08c", "Active", false, "business3", "Business" },
                    { "9", 0, "713128cb-48d6-4412-929e-3051c222eb17", new DateTime(2024, 11, 29, 15, 43, 44, 161, DateTimeKind.Utc).AddTicks(3871), "business4@example.com", false, false, null, null, null, null, null, false, "acf56ca9-8f6d-4e7f-8f57-7afa20297f2c", "Active", false, "business4", "Business" }
                });

            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "BusinessId", "Address", "BusinessEmail", "BusinessName", "BusinessPhoneNumber", "BusinessServices", "BusinessType", "CompanyVision", "Images", "LinkedIn", "PrimaryContactEmail", "PrimaryContactFirstName", "PrimaryContactLastName", "PrimaryJobTitle", "PrimaryPhoneNumber", "RegistrationNumber", "UserId" },
                values: new object[,]
                {
                    { 1, "123 Main St, Amman, Jordan", "business1@example.com", "Business 1", "123-456-7890", "", "seller", "", "", "", "contact@business1.com", "John", "Doe", "CEO", "123-456-7890", "REG12345", "6" },
                    { 2, "123 Main St, Amman, Jordan", "business2@example.com", "Business 2", "223-456-7890", "", "seller", "", "", "", "contact@business2.com", "Alice", "Smith", "Manager", "223-456-7890", "REG22345", "7" },
                    { 3, "123 Main St, Amman, Jordan", "business3@example.com", "Business 3", "323-456-7890", "", "buyer", "", "", "", "contact@business3.com", "Mark", "Brown", "Owner", "323-456-7890", "REG32345", "8" },
                    { 4, "123 Main St, Amman, Jordan", "business4@example.com", "Business 4", "423-456-7890", "", "seller", "", "", "", "contact@business4.com", "Linda", "Johnson", "CEO", "423-456-7890", "REG42345", "9" },
                    { 5, "123 Main St, Amman, Jordan", "business5@example.com", "Business 5", "523-456-7890", "", "buyer", "", "", "", "contact@business5.com", "Sarah", "Williams", "Manager", "523-456-7890", "REG52345", "10" }
                });

            migrationBuilder.InsertData(
                table: "Individuals",
                columns: new[] { "IndividualId", "Address", "FirstName", "Image", "LastName", "PhoneNumber", "UserId" },
                values: new object[,]
                {
                    { 1, "{\"street\":\"123 Main St\",\"city\":\"Amman\",\"country\":\"Jordan\"}", "Alice", null, "Williams", "987-654-3210", "11" },
                    { 2, "{\"street\":\"456 Oak St\",\"city\":\"Amman\",\"country\":\"Jordan\"}", "Bob", "profilepic2.jpg", "Johnson", "987-654-3220", "12" },
                    { 3, "{\"street\":\"789 Pine St\",\"city\":\"Amman\",\"country\":\"Jordan\"}", "Charlie", "profilepic3.jpg", "Smith", "987-654-3230", "13" },
                    { 4, "{\"street\":\"123 Birch St\",\"city\":\"Amman\",\"country\":\"Jordan\"}", "David", "profilepic4.jpg", "Davis", "987-654-3240", "14" },
                    { 5, "{\"street\":\"456 Maple St\",\"city\":\"Amman\",\"country\":\"Jordan\"}", "Eva", "profilepic5.jpg", "Martin", "987-654-3250", "15" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_ActionId",
                table: "ActivityLogs",
                column: "ActionId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLogs_UserId1",
                table: "ActivityLogs",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_CategoryId",
                table: "Auctions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_SellerId",
                table: "Auctions",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_BiddingHistory_AuctionId",
                table: "BiddingHistory",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_BiddingHistory_BidderId",
                table: "BiddingHistory",
                column: "BidderId");

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_UserId",
                table: "Businesses",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Individuals_UserId",
                table: "Individuals",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId1",
                table: "Notifications",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_TrafficLog_UserId1",
                table: "TrafficLog",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_AuctionId",
                table: "TransactionHistory",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_UserId1",
                table: "TransactionHistory",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_WatchList_AuctionId",
                table: "WatchList",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_WatchList_UserId1",
                table: "WatchList",
                column: "UserId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityLogs");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BiddingHistory");

            migrationBuilder.DropTable(
                name: "Businesses");

            migrationBuilder.DropTable(
                name: "Individuals");

            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "TrafficLog");

            migrationBuilder.DropTable(
                name: "TransactionHistory");

            migrationBuilder.DropTable(
                name: "WatchList");

            migrationBuilder.DropTable(
                name: "Actions");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Auctions");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
