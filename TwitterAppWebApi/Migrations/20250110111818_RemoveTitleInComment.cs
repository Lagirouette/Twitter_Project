using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTitleInComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "25b81b26-a9db-495a-8846-e76c9c7b2bfd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e223b9c7-8684-4a70-8924-d3e0fcd8093b");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Comments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "954b3a60-e278-49ef-8a18-ea7606a601df", null, "Admin", "ADMIN" },
                    { "de676097-1041-4b72-8adf-b75014acf8a8", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "954b3a60-e278-49ef-8a18-ea7606a601df");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "de676097-1041-4b72-8adf-b75014acf8a8");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "25b81b26-a9db-495a-8846-e76c9c7b2bfd", null, "Admin", "ADMIN" },
                    { "e223b9c7-8684-4a70-8924-d3e0fcd8093b", null, "User", "USER" }
                });
        }
    }
}
