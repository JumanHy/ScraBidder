using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "432645a4-83a7-4efc-b4e3-f40525335424");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5381a63b-8c4f-4b19-b632-cd1cfee004df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6808b7c-44e6-4b41-ac9d-1a8f663ba71d");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "25ceffff-03eb-48d1-974b-67708bf1ac6c", null, "Individual", "INDIVIDUAL" },
                    { "711255cc-ff15-43e7-8812-9e21981b4921", null, "Admin", "ADMIN" },
                    { "75be44f7-14a1-4bb6-a56a-875f6c811f51", null, "Business", "BUSINESS" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "6d5511b0-3cdd-4a4a-99d5-2c98e52c96ec", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "eef3bfd8-9460-43eb-8474-c2f06cac675b" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "1d498d51-57a0-490b-a28b-2bd6ce96b73e", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "807a4a10-d624-4c27-a27a-07318daed04e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "88ef9bc1-09b5-44a0-b421-638b588e6090", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "097ae36f-fa27-4bdb-9304-98aed57ce155" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "12",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "fcb3b21d-a9c4-4e59-8727-354f82aa6a10", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "367186e5-6dd7-472a-9937-c91c225acb40" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "1e88b3b9-ad1e-4ceb-afe0-8746427ccb71", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "aafb32cd-de2a-4e05-a4e8-591bfafc0006" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "14",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "7702e073-abd2-4871-b936-6b3b611c70a6", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "db764433-2314-4791-95c8-bcf704035697" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "15",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "7d7a10ea-95ff-40fe-ac7e-651743dfa303", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "50428ff4-dbd2-4521-993a-0f93248a3acd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "6d5bea72-d21e-4f82-b217-64e777210d79", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "1a83461e-02c4-4734-9462-a6f2e0ea19a1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "acb7ef53-dd82-4a1f-9088-773824d699f0", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "76a75bf3-7331-48b7-a879-a4368da74a8e" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "5b5e6d2c-f6dd-49a7-9e79-4468d7dd07bf", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "5eefa3a3-3e04-44d1-8248-955e8e0f0980" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a457ccec-c660-4ca5-96ed-f9d6364af6c8", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "b7efdb26-d34f-4782-bea2-cf3d25709b65" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a59accc3-0f8e-41f5-9560-fd9760b700b1", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "64419605-2c54-4636-9c63-cee0b235fda0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "036db0fe-ae96-43ec-842f-828c2777956e", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "0af50ef4-5cf2-40b7-996d-3e355cfbe8b9" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "b5f90ddb-1408-4b95-8c22-a58af38d2dae", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "4044fb71-efc3-4c6f-b670-0d74bcb8ca33" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "dd25cf05-9723-4bac-a45e-af51ec4d7424", new DateTime(2024, 12, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(1808), "42449709-74d2-4fdc-b241-89c834bb69f2" });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 27, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2657), new DateTime(2024, 12, 12, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2668), new DateTime(2024, 12, 2, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2667) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2682), new DateTime(2024, 11, 22, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2685), new DateTime(2024, 11, 12, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2684) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 2, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2764), new DateTime(2024, 12, 14, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2768), new DateTime(2024, 12, 4, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2766) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 17, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2776), new DateTime(2024, 11, 27, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2779), new DateTime(2024, 11, 19, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2777) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 29, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2789), new DateTime(2024, 12, 10, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2792), new DateTime(2024, 11, 30, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2791) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 10, 18, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2801), new DateTime(2024, 10, 28, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2804), new DateTime(2024, 10, 20, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2802) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 27, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2812), new DateTime(2024, 12, 9, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2815), new DateTime(2024, 11, 30, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2813) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 12, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2823), new DateTime(2024, 11, 22, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2826), new DateTime(2024, 11, 17, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2825) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 2, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2835), new DateTime(2024, 12, 13, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2838), new DateTime(2024, 12, 3, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2837) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 7, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2846), new DateTime(2024, 11, 19, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2849), new DateTime(2024, 11, 9, 10, 28, 43, 884, DateTimeKind.Utc).AddTicks(2848) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "25ceffff-03eb-48d1-974b-67708bf1ac6c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "711255cc-ff15-43e7-8812-9e21981b4921");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "75be44f7-14a1-4bb6-a56a-875f6c811f51");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "432645a4-83a7-4efc-b4e3-f40525335424", null, "Individual", "INDIVIDUAL" },
                    { "5381a63b-8c4f-4b19-b632-cd1cfee004df", null, "Admin", "ADMIN" },
                    { "b6808b7c-44e6-4b41-ac9d-1a8f663ba71d", null, "Business", "BUSINESS" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "fc0d6d7a-65de-49f3-95b7-0d03f40ddcd1", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "23a17022-c623-42f8-95d2-7aeaf3857fb5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "38ae3c24-cfbc-4eb5-8818-15e780f91dee", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "521f685d-0a06-44c7-877f-d72cebcf264d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "ece84f36-cf56-49bc-b567-b6457cb4f53e", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "f014bafc-7858-40a3-972a-a24ff80d6968" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "12",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "521fb37c-bf61-4893-aecc-4cc068becac6", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "1920b8c7-e4cc-41ee-a43a-0e2202856fe1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "726e647e-fce4-4391-8155-a7f4034b4d61", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "bd9af5c8-a48a-4ec5-904e-234719fc5e20" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "14",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a5d068bd-690b-4fe1-aeb4-e7c641538dfa", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "0ee6d9e1-7f7b-44cd-90ee-47a595dd059d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "15",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "c8bd8e35-1217-46a4-9510-7b819510c9b0", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "784e6f7b-e597-44c2-a20e-67bf67d57a31" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "58415efc-1473-484e-ac66-6e5d2c5651dc", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "0c3df2a2-8c69-4cc3-85b4-a47902b2ac53" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "47208e3d-50da-4a40-be29-ff36ca75d2f7", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "0cc8837b-a1d3-43cc-afc3-25ebcfd98bec" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "d817e7f7-466c-4764-9eb7-554f1faaf9a0", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "aecb71a7-62ec-484c-95e9-a8c1c3689bb5" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a32d4c5d-0d28-4066-af77-35c2ee4420f8", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "6d7d9191-3e00-4c1e-8568-b69989c5d592" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "b12d5cf0-7f8e-4d3b-9ad7-475d7e391940", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "12627563-0bf4-4fa2-8bc8-dea297f39f45" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "94cd9bdf-ef9d-4987-aa1c-9cb415451519", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "083f7597-7109-48de-8703-7e6c7d765be6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "2dbf1a9d-c3f9-465a-864d-816a1b508bbf", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "6e324ea5-c1fd-46e2-9b3c-b953b88bc8d0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "4d139191-9471-438a-9eed-096d0a204952", new DateTime(2024, 12, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(3898), "0cfa33d9-33fa-46b0-9aaf-8702c60e4b44" });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4526), new DateTime(2024, 12, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4537), new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4534) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4550), new DateTime(2024, 11, 21, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4552), new DateTime(2024, 11, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4551) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4556), new DateTime(2024, 12, 13, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4557), new DateTime(2024, 12, 3, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4557) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 16, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4562), new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4563), new DateTime(2024, 11, 18, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4562) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 28, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4568), new DateTime(2024, 12, 9, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4569), new DateTime(2024, 11, 29, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4569) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 10, 17, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4574), new DateTime(2024, 10, 27, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4575), new DateTime(2024, 10, 19, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4574) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 26, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4579), new DateTime(2024, 12, 8, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4580), new DateTime(2024, 11, 29, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4579) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 11, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4584), new DateTime(2024, 11, 21, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4585), new DateTime(2024, 11, 16, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4585) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 1, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4590), new DateTime(2024, 12, 12, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4591), new DateTime(2024, 12, 2, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4591) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 6, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4595), new DateTime(2024, 11, 18, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4597), new DateTime(2024, 11, 8, 18, 48, 56, 711, DateTimeKind.Utc).AddTicks(4596) });
        }
    }
}
