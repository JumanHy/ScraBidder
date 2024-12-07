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
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IpAddress = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ActionId = table.Column<int>(type: "int", nullable: false),
                    ActionTime = table.Column<DateTime>(type: "datetime2", nullable: false)
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
                        name: "FK_ActivityLogs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    BusinessType = table.Column<int>(type: "int", nullable: false),
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
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NotificationsInfo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationsId);
                    table.ForeignKey(
                        name: "FK_Notifications_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "Shipments",
                columns: table => new
                {
                    ShipmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    SellerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DeliveryStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.ShipmentId);
                    table.ForeignKey(
                        name: "FK_Shipments_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipments_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionHistory",
                columns: table => new
                {
                    TransactionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    RelatedId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PayerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PayerId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TransactionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TransactionPurpose = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionHistory", x => x.TransactionId);
                    table.ForeignKey(
                        name: "FK_TransactionHistory_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AuctionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatchList", x => x.WatchId);
                    table.ForeignKey(
                        name: "FK_WatchList_AspNetUsers_UserId",
                        column: x => x.UserId,
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
                    { "432645a4-83a7-4efc-b4e3-f40525335424", null, "Individual", "INDIVIDUAL" },
                    { "5381a63b-8c4f-4b19-b632-cd1cfee004df", null, "Admin", "ADMIN" },
                    { "b6808b7c-44e6-4b41-ac9d-1a8f663ba71d", null, "Business", "BUSINESS" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "Status", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { "1", 0, "fc0d6d7a-65de-49f3-95b7-0d03f40ddcd1", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "admin1@example.com", false, false, null, null, null, null, null, false, "23a17022-c623-42f8-95d2-7aeaf3857fb5", "Active", false, "admin1" },
                    { "10", 0, "38ae3c24-cfbc-4eb5-8818-15e780f91dee", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "business5@example.com", false, false, null, null, null, null, null, false, "521f685d-0a06-44c7-877f-d72cebcf264d", "Pending", false, "business5" },
                    { "11", 0, "ece84f36-cf56-49bc-b567-b6457cb4f53e", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "individual1@example.com", false, false, null, null, null, null, null, false, "f014bafc-7858-40a3-972a-a24ff80d6968", "Active", false, "individual1" },
                    { "12", 0, "521fb37c-bf61-4893-aecc-4cc068becac6", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "individual2@example.com", false, false, null, null, null, null, null, false, "1920b8c7-e4cc-41ee-a43a-0e2202856fe1", "Blocked", false, "individual2" },
                    { "13", 0, "726e647e-fce4-4391-8155-a7f4034b4d61", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "individual3@example.com", false, false, null, null, null, null, null, false, "bd9af5c8-a48a-4ec5-904e-234719fc5e20", "Active", false, "individual3" },
                    { "14", 0, "a5d068bd-690b-4fe1-aeb4-e7c641538dfa", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "individual4@example.com", false, false, null, null, null, null, null, false, "0ee6d9e1-7f7b-44cd-90ee-47a595dd059d", "Pending", false, "individual4" },
                    { "15", 0, "c8bd8e35-1217-46a4-9510-7b819510c9b0", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "individual5@example.com", false, false, null, null, null, null, null, false, "784e6f7b-e597-44c2-a20e-67bf67d57a31", "Active", false, "individual5" },
                    { "2", 0, "58415efc-1473-484e-ac66-6e5d2c5651dc", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "admin2@example.com", false, false, null, null, null, null, null, false, "0c3df2a2-8c69-4cc3-85b4-a47902b2ac53", "Active", false, "admin2" },
                    { "3", 0, "47208e3d-50da-4a40-be29-ff36ca75d2f7", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "admin3@example.com", false, false, null, null, null, null, null, false, "0cc8837b-a1d3-43cc-afc3-25ebcfd98bec", "Blocked", false, "admin3" },
                    { "4", 0, "d817e7f7-466c-4764-9eb7-554f1faaf9a0", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "admin4@example.com", false, false, null, null, null, null, null, false, "aecb71a7-62ec-484c-95e9-a8c1c3689bb5", "Active", false, "admin4" },
                    { "5", 0, "a32d4c5d-0d28-4066-af77-35c2ee4420f8", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "admin5@example.com", false, false, null, null, null, null, null, false, "6d7d9191-3e00-4c1e-8568-b69989c5d592", "Pending", false, "admin5" },
                    { "6", 0, "b12d5cf0-7f8e-4d3b-9ad7-475d7e391940", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "business1@example.com", false, false, null, null, null, null, null, false, "12627563-0bf4-4fa2-8bc8-dea297f39f45", "Active", false, "business1" },
                    { "7", 0, "94cd9bdf-ef9d-4987-aa1c-9cb415451519", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "business2@example.com", false, false, null, null, null, null, null, false, "083f7597-7109-48de-8703-7e6c7d765be6", "Pending", false, "business2" },
                    { "8", 0, "2dbf1a9d-c3f9-465a-864d-816a1b508bbf", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "business3@example.com", false, false, null, null, null, null, null, false, "6e324ea5-c1fd-46e2-9b3c-b953b88bc8d0", "Active", false, "business3" },
                    { "9", 0, "4d139191-9471-438a-9eed-096d0a204952", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "business4@example.com", false, false, null, null, null, null, null, false, "0cfa33d9-33fa-46b0-9aaf-8702c60e4b44", "Active", false, "business4" }
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "CategoryName" },
                values: new object[,]
                {
                    { 1, "Aluminum" },
                    { 2, "Copper" },
                    { 3, "Plastic" },
                    { 4, "Iron" },
                    { 5, "Stainless Steel" },
                    { 6, "Wood" },
                    { 7, "Glass" },
                    { 8, "Paper" },
                    { 9, "Rubber" },
                    { 10, "Textile" },
                    { 11, "Ceramic" }
                });

            migrationBuilder.InsertData(
                table: "Auctions",
                columns: new[] { "AuctionId", "Address", "AuctionStatus", "CategoryId", "Condition", "CreatedAt", "CurrentBid", "Description", "EndingTime", "Images", "Quantity", "ReservePrice", "SellerId", "StartingBid", "StartingTime", "Title" },
                values: new object[,]
                {
                    { 1, "{\"city\": \"New York\", \"state\": \"NY\"}", "Started", 1, "Mixed", new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4526), 650.00m, "A collection of high-grade aluminum scraps.", new DateTime(2024, 12, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4537), "[\"aluminum1.jpg\", \"aluminum2.jpg\"]", 100m, 800.00m, "4", 500.00m, new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4534), "Aluminum Scrap Bundle" },
                    { 2, "{\"city\": \"Los Angeles\", \"state\": \"CA\"}", "Ended", 2, "Used", new DateTime(2024, 11, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4550), 1200.00m, "Various grades of copper wiring ready for recycling.", new DateTime(2024, 11, 21, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4552), "[\"copper1.jpg\", \"copper2.jpg\"]", 200m, 1500.00m, "4", 1000.00m, new DateTime(2024, 11, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4551), "Copper Wiring Scrap" },
                    { 3, "{\"city\": \"Houston\", \"state\": \"TX\"}", "Started", 3, "New", new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4556), 450.00m, "Recyclable plastic waste from industrial sources.", new DateTime(2024, 12, 13, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4557), "[\"plastic1.jpg\"]", 50m, 600.00m, "4", 300.00m, new DateTime(2024, 12, 3, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4557), "Plastic Waste" },
                    { 4, "{\"city\": \"Chicago\", \"state\": \"IL\"}", "Ended", 4, "Used", new DateTime(2024, 11, 16, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4562), 800.00m, "Scrap iron sheets from old construction projects.", new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4563), "[\"iron1.jpg\", \"iron2.jpg\"]", 300m, 1000.00m, "4", 700.00m, new DateTime(2024, 11, 18, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4562), "Iron Sheets" },
                    { 5, "{\"city\": \"Dallas\", \"state\": \"TX\"}", "Started", 5, "New", new DateTime(2024, 11, 28, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4568), 1600.00m, "Premium-grade stainless steel scrap materials.", new DateTime(2024, 12, 9, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4569), "[\"steel1.jpg\", \"steel2.jpg\"]", 150m, 2000.00m, "4", 1500.00m, new DateTime(2024, 11, 29, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4569), "Stainless Steel Scraps" },
                    { 6, "{\"city\": \"Atlanta\", \"state\": \"GA\"}", "Ended", 6, "Mixed", new DateTime(2024, 10, 17, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4574), 250.00m, "Recyclable wooden pallets from warehouses.", new DateTime(2024, 10, 27, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4575), "[\"wood1.jpg\", \"wood2.jpg\"]", 500m, 300.00m, "4", 200.00m, new DateTime(2024, 10, 19, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4574), "Wooden Pallets" },
                    { 7, "{\"city\": \"Phoenix\", \"state\": \"AZ\"}", "Started", 7, "Used", new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4579), 550.00m, "Glass shards from old construction materials.", new DateTime(2024, 12, 8, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4580), "[\"glass1.jpg\"]", 250m, 700.00m, "4", 400.00m, new DateTime(2024, 11, 29, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4579), "Glass Shards" },
                    { 8, "{\"city\": \"Seattle\", \"state\": \"WA\"}", "Ended", 8, "Mixed", new DateTime(2024, 11, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4584), 150.00m, "Paper waste from old documents and magazines.", new DateTime(2024, 11, 21, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4585), "[\"paper1.jpg\"]", 1000m, 200.00m, "4", 100.00m, new DateTime(2024, 11, 16, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4585), "Paper Waste" },
                    { 9, "{\"city\": \"San Francisco\", \"state\": \"CA\"}", "Started", 9, "Used", new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4590), 350.00m, "Used rubber tires ready for recycling.", new DateTime(2024, 12, 12, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4591), "[\"rubber1.jpg\"]", 400m, 500.00m, "4", 300.00m, new DateTime(2024, 12, 2, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4591), "Rubber Tires" },
                    { 10, "{\"city\": \"Denver\", \"state\": \"CO\"}", "Ended", 11, "Used", new DateTime(2024, 11, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4595), 600.00m, "Scrap ceramic tiles from construction sites.", new DateTime(2024, 11, 18, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4597), "[\"ceramic1.jpg\"]", 50m, 700.00m, "4", 500.00m, new DateTime(2024, 11, 8, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4596), "Ceramic Tiles" }
                });

            migrationBuilder.InsertData(
                table: "Businesses",
                columns: new[] { "BusinessId", "Address", "BusinessEmail", "BusinessName", "BusinessPhoneNumber", "BusinessServices", "BusinessType", "CompanyVision", "Images", "LinkedIn", "PrimaryContactEmail", "PrimaryContactFirstName", "PrimaryContactLastName", "PrimaryJobTitle", "PrimaryPhoneNumber", "RegistrationNumber", "UserId" },
                values: new object[,]
                {
                    { 1, "123 Main St, Amman, Jordan", "business1@example.com", "Business 1", "123-456-7890", "", 1, "", "", "", "contact@business1.com", "John", "Doe", "CEO", "123-456-7890", "REG12345", "6" },
                    { 2, "123 Main St, Amman, Jordan", "business2@example.com", "Business 2", "223-456-7890", "", 1, "", "", "", "contact@business2.com", "Alice", "Smith", "Manager", "223-456-7890", "REG22345", "7" },
                    { 3, "123 Main St, Amman, Jordan", "business3@example.com", "Business 3", "323-456-7890", "", 2, "", "", "", "contact@business3.com", "Mark", "Brown", "Owner", "323-456-7890", "REG32345", "8" },
                    { 4, "123 Main St, Amman, Jordan", "business4@example.com", "Business 4", "423-456-7890", "", 1, "", "", "", "contact@business4.com", "Linda", "Johnson", "CEO", "423-456-7890", "REG42345", "9" },
                    { 5, "123 Main St, Amman, Jordan", "business5@example.com", "Business 5", "523-456-7890", "", 1, "", "", "", "contact@business5.com", "Sarah", "Williams", "Manager", "523-456-7890", "REG52345", "10" }
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
                name: "IX_ActivityLogs_UserId",
                table: "ActivityLogs",
                column: "UserId");

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
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_AuctionId",
                table: "Shipments",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_SellerId",
                table: "Shipments",
                column: "SellerId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_AuctionId",
                table: "TransactionHistory",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionHistory_UserId",
                table: "TransactionHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WatchList_AuctionId",
                table: "WatchList",
                column: "AuctionId");

            migrationBuilder.CreateIndex(
                name: "IX_WatchList_UserId",
                table: "WatchList",
                column: "UserId");
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
                name: "Shipments");

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
