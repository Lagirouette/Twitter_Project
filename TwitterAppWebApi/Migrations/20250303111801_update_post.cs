﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class update_post : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0f63e838-aeca-4d5c-9ea8-f0ca28117b8f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c5bad5bf-3d17-467f-9661-fdbee6fd02a4");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "Posts");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "18cf3b82-ddf7-4cb9-bd17-05eabe453958", null, "User", "USER" },
                    { "88e71e39-128f-4aad-8e45-7c45d61c68f2", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Title",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0f63e838-aeca-4d5c-9ea8-f0ca28117b8f", null, "Admin", "ADMIN" },
                    { "c5bad5bf-3d17-467f-9661-fdbee6fd02a4", null, "User", "USER" }
                });
        }
    }
}
