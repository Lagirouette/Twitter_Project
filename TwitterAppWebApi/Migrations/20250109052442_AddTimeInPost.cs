using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddTimeInPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21a1f987-d807-4e35-9958-b384821b8e0a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3aed86d6-3440-4482-9cba-9abee9323892");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatOn",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "25b81b26-a9db-495a-8846-e76c9c7b2bfd", null, "Admin", "ADMIN" },
                    { "e223b9c7-8684-4a70-8924-d3e0fcd8093b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "CreatOn",
                table: "Posts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21a1f987-d807-4e35-9958-b384821b8e0a", null, "Admin", "ADMIN" },
                    { "3aed86d6-3440-4482-9cba-9abee9323892", null, "User", "USER" }
                });
        }
    }
}
