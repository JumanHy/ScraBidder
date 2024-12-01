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
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AccountStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityLogs",
                columns: table => new
                {
                    LogId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_ActivityLogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Auctions",
                columns: table => new
                {
                    AuctionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SellerId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_Auctions_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Auctions_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Businesses",
                columns: table => new
                {
                    BusinessId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BusinessName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    BusinessServices = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessType = table.Column<int>(type: "int", nullable: false),
                    BusinessEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BusinessPhoneNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyVision = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkedIn = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
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
                        name: "FK_Businesses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Individuals",
                columns: table => new
                {
                    IndividualId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Individuals", x => x.IndividualId);
                    table.ForeignKey(
                        name: "FK_Individuals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    NotificationsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    NotificationsInfo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.NotificationsId);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BiddingHistory",
                columns: table => new
                {
                    BidId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    BidderId = table.Column<int>(type: "int", nullable: false),
                    BidAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BidTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BiddingHistory", x => x.BidId);
                    table.ForeignKey(
                        name: "FK_BiddingHistory_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BiddingHistory_Users_BidderId",
                        column: x => x.BidderId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    ShipmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AuctionId = table.Column<int>(type: "int", nullable: false),
                    SellerId = table.Column<int>(type: "int", nullable: false),
                    DeliveryStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.ShipmentId);
                    table.ForeignKey(
                        name: "FK_Shipments_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Shipments_Users_SellerId",
                        column: x => x.SellerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TransactionHistory",
                columns: table => new
                {
                    TransactionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
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
                        name: "FK_TransactionHistory_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TransactionHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WatchList",
                columns: table => new
                {
                    WatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AuctionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatchList", x => x.WatchId);
                    table.ForeignKey(
                        name: "FK_WatchList_Auctions_AuctionId",
                        column: x => x.AuctionId,
                        principalTable: "Auctions",
                        principalColumn: "AuctionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WatchList_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
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
                table: "Roles",
                columns: new[] { "RoleId", "RoleName" },
                values: new object[,]
                {
                    { 1, "Admin" },
                    { 2, "Individual" },
                    { 3, "Business" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "AccountStatus", "CreatedAt", "Email", "RoleId" },
                values: new object[,]
                {
                    { 1, "Approved", new DateTime(2024, 11, 27, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8364), "admin@example.com", 1 },
                    { 2, "Approved", new DateTime(2024, 11, 27, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8368), "individual@example.com", 2 },
                    { 3, "Approved", new DateTime(2024, 11, 27, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8369), "individual2@example.com", 2 },
                    { 4, "Approved", new DateTime(2024, 11, 27, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8370), "business@example.com", 3 }
                });

            migrationBuilder.InsertData(
                table: "Auctions",
                columns: new[] { "AuctionId", "Address", "AuctionStatus", "CategoryId", "Condition", "CreatedAt", "CurrentBid", "Description", "EndingTime", "Images", "Quantity", "ReservePrice", "SellerId", "StartingBid", "StartingTime", "Title" },
                values: new object[,]
                {
                    { 1, "{\"city\": \"New York\", \"state\": \"NY\"}", "Started", 1, "Mixed", new DateTime(2024, 11, 17, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8400), 650.00m, "A collection of high-grade aluminum scraps.", new DateTime(2024, 12, 2, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8407), "[\"aluminum1.jpg\", \"aluminum2.jpg\"]", 100m, 800.00m, 4, 500.00m, new DateTime(2024, 11, 22, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8407), "Aluminum Scrap Bundle" },
                    { 2, "{\"city\": \"Los Angeles\", \"state\": \"CA\"}", "Ended", 2, "Used", new DateTime(2024, 10, 28, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8417), 1200.00m, "Various grades of copper wiring ready for recycling.", new DateTime(2024, 11, 12, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8418), "[\"copper1.jpg\", \"copper2.jpg\"]", 200m, 1500.00m, 4, 1000.00m, new DateTime(2024, 11, 2, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8418), "Copper Wiring Scrap" },
                    { 3, "{\"city\": \"Houston\", \"state\": \"TX\"}", "Started", 3, "New", new DateTime(2024, 11, 22, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8422), 450.00m, "Recyclable plastic waste from industrial sources.", new DateTime(2024, 12, 4, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8423), "[\"plastic1.jpg\"]", 50m, 600.00m, 4, 300.00m, new DateTime(2024, 11, 24, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8422), "Plastic Waste" },
                    { 4, "{\"city\": \"Chicago\", \"state\": \"IL\"}", "Ended", 4, "Used", new DateTime(2024, 11, 7, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8426), 800.00m, "Scrap iron sheets from old construction projects.", new DateTime(2024, 11, 17, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8427), "[\"iron1.jpg\", \"iron2.jpg\"]", 300m, 1000.00m, 4, 700.00m, new DateTime(2024, 11, 9, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8427), "Iron Sheets" },
                    { 5, "{\"city\": \"Dallas\", \"state\": \"TX\"}", "Started", 5, "New", new DateTime(2024, 11, 19, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8430), 1600.00m, "Premium-grade stainless steel scrap materials.", new DateTime(2024, 11, 30, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8433), "[\"steel1.jpg\", \"steel2.jpg\"]", 150m, 2000.00m, 4, 1500.00m, new DateTime(2024, 11, 20, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8433), "Stainless Steel Scraps" },
                    { 6, "{\"city\": \"Atlanta\", \"state\": \"GA\"}", "Ended", 6, "Mixed", new DateTime(2024, 10, 8, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8437), 250.00m, "Recyclable wooden pallets from warehouses.", new DateTime(2024, 10, 18, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8438), "[\"wood1.jpg\", \"wood2.jpg\"]", 500m, 300.00m, 4, 200.00m, new DateTime(2024, 10, 10, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8437), "Wooden Pallets" },
                    { 7, "{\"city\": \"Phoenix\", \"state\": \"AZ\"}", "Started", 7, "Used", new DateTime(2024, 11, 17, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8441), 550.00m, "Glass shards from old construction materials.", new DateTime(2024, 11, 29, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8442), "[\"glass1.jpg\"]", 250m, 700.00m, 4, 400.00m, new DateTime(2024, 11, 20, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8441), "Glass Shards" },
                    { 8, "{\"city\": \"Seattle\", \"state\": \"WA\"}", "Ended", 8, "Mixed", new DateTime(2024, 11, 2, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8445), 150.00m, "Paper waste from old documents and magazines.", new DateTime(2024, 11, 12, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8447), "[\"paper1.jpg\"]", 1000m, 200.00m, 4, 100.00m, new DateTime(2024, 11, 7, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8446), "Paper Waste" },
                    { 9, "{\"city\": \"San Francisco\", \"state\": \"CA\"}", "Started", 9, "Used", new DateTime(2024, 11, 22, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8453), 350.00m, "Used rubber tires ready for recycling.", new DateTime(2024, 12, 3, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8454), "[\"rubber1.jpg\"]", 400m, 500.00m, 4, 300.00m, new DateTime(2024, 11, 23, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8454), "Rubber Tires" },
                    { 10, "{\"city\": \"Denver\", \"state\": \"CO\"}", "Ended", 11, "Used", new DateTime(2024, 10, 28, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8458), 600.00m, "Scrap ceramic tiles from construction sites.", new DateTime(2024, 11, 9, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8459), "[\"ceramic1.jpg\"]", 50m, 700.00m, 4, 500.00m, new DateTime(2024, 10, 30, 18, 18, 23, 812, DateTimeKind.Utc).AddTicks(8458), "Ceramic Tiles" }
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
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Individuals_UserId",
                table: "Individuals",
                column: "UserId");

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
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

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
                name: "Auctions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
