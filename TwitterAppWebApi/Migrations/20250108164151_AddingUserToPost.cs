using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddingUserToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b8cd6c44-8e93-4f7d-99a7-934bcd916457");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c9057f9b-840f-49d4-b5f7-5d3c7ab4bca9");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "Posts",
                newName: "Body");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Posts",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "21a1f987-d807-4e35-9958-b384821b8e0a", null, "Admin", "ADMIN" },
                    { "3aed86d6-3440-4482-9cba-9abee9323892", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AppUserId",
                table: "Posts",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_AspNetUsers_AppUserId",
                table: "Posts",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_AspNetUsers_AppUserId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_AppUserId",
                table: "Posts");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "21a1f987-d807-4e35-9958-b384821b8e0a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3aed86d6-3440-4482-9cba-9abee9323892");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Posts",
                newName: "Content");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "b8cd6c44-8e93-4f7d-99a7-934bcd916457", null, "User", "USER" },
                    { "c9057f9b-840f-49d4-b5f7-5d3c7ab4bca9", null, "Admin", "ADMIN" }
                });
        }
    }
}
