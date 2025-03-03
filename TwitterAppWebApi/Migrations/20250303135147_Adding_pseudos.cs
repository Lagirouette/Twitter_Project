using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class Adding_pseudos : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "18cf3b82-ddf7-4cb9-bd17-05eabe453958");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "88e71e39-128f-4aad-8e45-7c45d61c68f2");

            migrationBuilder.AddColumn<string>(
                name: "Pseudo",
                table: "AspNetUsers",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4965e3c6-ce0f-4b70-b943-a18d54122838", null, "Admin", "ADMIN" },
                    { "e4ec1e78-6d20-4465-b2e1-338bf6501858", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4965e3c6-ce0f-4b70-b943-a18d54122838");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4ec1e78-6d20-4465-b2e1-338bf6501858");

            migrationBuilder.DropColumn(
                name: "Pseudo",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18cf3b82-ddf7-4cb9-bd17-05eabe453958", null, "User", "USER" },
                    { "88e71e39-128f-4aad-8e45-7c45d61c68f2", null, "Admin", "ADMIN" }
                });
        }
    }
}
