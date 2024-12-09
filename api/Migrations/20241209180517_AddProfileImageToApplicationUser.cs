using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddProfileImageToApplicationUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_AspNetUsers_SellerId",
                table: "Shipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_Auctions_AuctionId",
                table: "Shipments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "41655db1-579f-457d-a298-b0383f4d4b59");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1e98f4b-5232-4897-8f66-02574fc41d85");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a985bf9a-81eb-411a-86b4-c3039a517c5f");

            migrationBuilder.AddColumn<string>(
                name: "BuyerId",
                table: "Shipments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProfileImage",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1625912d-dbe8-420a-a362-268bd285c3e9", null, "Business", "BUSINESS" },
                    { "29d8c863-f035-4d7d-847e-eb6fed8408de", null, "Admin", "ADMIN" },
                    { "5485604c-0405-4463-9149-bb7775b0d0f7", null, "Individual", "INDIVIDUAL" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "7be72430-02cc-4a89-949d-0b94997df526", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "803cf6ed-e990-454d-9cc9-e90668fb89e0" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "2307c741-2676-44e6-af16-405d8dbfb6a6", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "5e8076de-b6ff-41ee-8c56-48f3bb6ad53c" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "2c2103a5-41b2-4967-93f8-dd207d736e8c", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "68de5648-11fa-4acc-af52-f001719a1ec6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "12",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "ed86e6b1-ceb5-4e04-b9e7-b4e0a4900129", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "6f93d92a-3814-4b7f-b7bf-f7c9b3345d49" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "cfc0b958-1a13-42f5-8ba5-213ab488e4ab", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "061e1a5b-b153-4c06-bd01-b245ec0727ec" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "14",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "f34e069d-7f6b-4e2e-9616-26571f58f0bc", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "de024104-f0c3-4575-b037-9f9b89044c92" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "15",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "67db5625-54ad-4d62-88e5-b20096f18a94", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "2f9cbc74-aabf-4b14-bc4f-ba628f3bd717" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "31aa4427-83bc-4f14-b440-709cf13592c7", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "efdddf41-d5c9-43c5-af30-a53f3023a9c6" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "fef06056-d9a3-467f-80a7-75d02f7f769a", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "171d312c-8286-4433-8c50-cb9cb8c588a7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "24f869b6-fdde-45b9-b5c9-5e3cc4876a87", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "7eebc908-2572-48a4-a71a-81f086552db2" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "98461d2d-9fd7-4d33-a940-4a30cb1bcdd9", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "e1979ded-7359-4520-984e-cf9ca31e62fd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "9b26f66b-00ec-4cea-b293-e3d2bfcb9b3f", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "6d751a4a-ac53-4b04-9b79-88b5db8f4faf" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "eb5ad52b-c40a-4fcc-b10b-c59c75614fc8", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "b1256a54-6755-4d18-af1d-7eb62267879f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "33d7556c-b7f1-417d-82ac-b5bd09b328e7", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "947ef7b2-fa6f-43e2-8e11-d131e5a286a3" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "ProfileImage", "SecurityStamp" },
                values: new object[] { "587f2e75-23c9-4e97-9976-09aaeffbe779", new DateTime(2024, 12, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1334), "", "52810498-1282-4e26-8a9a-209aad428532" });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 29, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1813), new DateTime(2024, 12, 14, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1822), new DateTime(2024, 12, 4, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1821) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1861), new DateTime(2024, 11, 24, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1863), new DateTime(2024, 11, 14, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1862) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 4, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1868), new DateTime(2024, 12, 16, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1870), new DateTime(2024, 12, 6, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1869) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 19, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1875), new DateTime(2024, 11, 29, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1877), new DateTime(2024, 11, 21, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1876) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 1, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1884), new DateTime(2024, 12, 12, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1886), new DateTime(2024, 12, 2, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1885) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 10, 20, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1890), new DateTime(2024, 10, 30, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1892), new DateTime(2024, 10, 22, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1891) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 29, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1897), new DateTime(2024, 12, 11, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1899), new DateTime(2024, 12, 2, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1898) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 14, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1904), new DateTime(2024, 11, 24, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1906), new DateTime(2024, 11, 19, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1905) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 4, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1911), new DateTime(2024, 12, 15, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1912), new DateTime(2024, 12, 5, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1912) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 9, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1919), new DateTime(2024, 11, 21, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1920), new DateTime(2024, 11, 11, 18, 5, 15, 913, DateTimeKind.Utc).AddTicks(1919) });

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_BuyerId",
                table: "Shipments",
                column: "BuyerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_AspNetUsers_BuyerId",
                table: "Shipments",
                column: "BuyerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_AspNetUsers_SellerId",
                table: "Shipments",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_Auctions_AuctionId",
                table: "Shipments",
                column: "AuctionId",
                principalTable: "Auctions",
                principalColumn: "AuctionId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_AspNetUsers_BuyerId",
                table: "Shipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_AspNetUsers_SellerId",
                table: "Shipments");

            migrationBuilder.DropForeignKey(
                name: "FK_Shipments_Auctions_AuctionId",
                table: "Shipments");

            migrationBuilder.DropIndex(
                name: "IX_Shipments_BuyerId",
                table: "Shipments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1625912d-dbe8-420a-a362-268bd285c3e9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "29d8c863-f035-4d7d-847e-eb6fed8408de");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5485604c-0405-4463-9149-bb7775b0d0f7");

            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "Shipments");

            migrationBuilder.DropColumn(
                name: "ProfileImage",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "41655db1-579f-457d-a298-b0383f4d4b59", null, "Individual", "INDIVIDUAL" },
                    { "a1e98f4b-5232-4897-8f66-02574fc41d85", null, "Business", "BUSINESS" },
                    { "a985bf9a-81eb-411a-86b4-c3039a517c5f", null, "Admin", "ADMIN" }
                });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "1",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "acfae306-7164-4149-b31e-d5bfc65432d4", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "1d17fc68-ae0f-4f29-9c78-c06c263c09cd" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "10",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "07147d18-4ed2-4e67-b1bc-8e6aff2dacad", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "3e83c243-0306-450f-9df5-ff8491bdd49f" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "11",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "88454579-7eb5-499f-87fb-164be66cc318", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "19c36a91-8666-43b6-98aa-2f21cb198649" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "12",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "2d9a4863-c38b-492b-a3fc-710957290e5b", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "25aee866-15a3-44af-911e-723cded7f73d" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "13",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "13a82b8b-48b9-491d-9434-62c65603cec0", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "7f680be6-8bef-4b1d-a5bd-e6e55c469da1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "14",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "97ef3855-1f08-4499-8f41-8bd5a8a20513", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "83299943-a931-41c8-bf76-d3911e9da8c1" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "15",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "3a606425-6486-4b82-9ae8-df1be4ee14b0", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "b198f64f-2564-4b88-a59e-88c889bb2060" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "2",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a9b6e8cb-e773-4133-81f1-54553b781d3e", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "f7e7200b-35c8-4e49-a903-c18631162000" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "e850788c-962d-4427-8585-9cd443a93cf3", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "b9c093e1-61c8-4e23-8a5f-00da9d353163" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "c9700bf1-d6be-4f4e-8e94-6d413ec4e4ce", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "84396d06-7236-423c-bbcb-f8d863e27083" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "5",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "5b695fe7-333d-46d2-b86e-7115c304423b", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "682b1154-0ad7-4ca5-8ef6-33e65019dcad" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "6",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "cdeefe9b-6abb-4f57-b6c9-1925ba23740b", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "ebe6c5f7-393d-4715-8319-8fab05455426" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "7",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "c38474f2-8138-43c3-ba09-9da63d525668", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "ecca230d-abba-493f-bd05-0f40cab755c7" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "8",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "a48707cd-e7a0-43dc-80ca-782c9e48dbf5", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "f6e172ea-0971-4951-b8cd-64cc53df6e97" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9",
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "SecurityStamp" },
                values: new object[] { "30949a02-7ba8-4b25-9ef3-c37f76455753", new DateTime(2024, 12, 7, 15, 56, 8, 493, DateTimeKind.Utc).AddTicks(9689), "477fdd74-728d-450a-9cc0-ade46f7e6fab" });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 1,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 27, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(212), new DateTime(2024, 12, 12, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(221), new DateTime(2024, 12, 2, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(220) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 2,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 7, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(229), new DateTime(2024, 11, 22, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(230), new DateTime(2024, 11, 12, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(230) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 3,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 2, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(236), new DateTime(2024, 12, 14, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(237), new DateTime(2024, 12, 4, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(236) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 4,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 17, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(242), new DateTime(2024, 11, 27, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(243), new DateTime(2024, 11, 19, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(242) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 5,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 29, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(248), new DateTime(2024, 12, 10, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(250), new DateTime(2024, 11, 30, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(249) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 6,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 10, 18, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(254), new DateTime(2024, 10, 28, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(256), new DateTime(2024, 10, 20, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(255) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 7,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 27, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(262), new DateTime(2024, 12, 9, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(263), new DateTime(2024, 11, 30, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(263) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 8,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 12, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(269), new DateTime(2024, 11, 22, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(270), new DateTime(2024, 11, 17, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(269) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 9,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 12, 2, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(274), new DateTime(2024, 12, 13, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(276), new DateTime(2024, 12, 3, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(275) });

            migrationBuilder.UpdateData(
                table: "Auctions",
                keyColumn: "AuctionId",
                keyValue: 10,
                columns: new[] { "CreatedAt", "EndingTime", "StartingTime" },
                values: new object[] { new DateTime(2024, 11, 7, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(281), new DateTime(2024, 11, 19, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(282), new DateTime(2024, 11, 9, 15, 56, 8, 494, DateTimeKind.Utc).AddTicks(281) });

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_AspNetUsers_SellerId",
                table: "Shipments",
                column: "SellerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Shipments_Auctions_AuctionId",
                table: "Shipments",
                column: "AuctionId",
                principalTable: "Auctions",
                principalColumn: "AuctionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
