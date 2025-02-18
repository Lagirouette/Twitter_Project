using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddColumnInFollow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "856c3fcb-e60b-4975-86f3-d98a3db22b64");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b4b4d1e-3a0d-40dc-b1d7-6fe277adec78");

            migrationBuilder.AddColumn<string>(
                name: "Followedby",
                table: "Follows",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Follows",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a7be338f-614c-49bd-917b-685017204726", null, "Admin", "ADMIN" },
                    { "f363ff0d-9121-4eab-8b1c-d7343b6b0fe2", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Follows_UserId",
                table: "Follows",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Follows_AspNetUsers_UserId",
                table: "Follows",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follows_AspNetUsers_UserId",
                table: "Follows");

            migrationBuilder.DropIndex(
                name: "IX_Follows_UserId",
                table: "Follows");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a7be338f-614c-49bd-917b-685017204726");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f363ff0d-9121-4eab-8b1c-d7343b6b0fe2");

            migrationBuilder.DropColumn(
                name: "Followedby",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Follows");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "856c3fcb-e60b-4975-86f3-d98a3db22b64", null, "Admin", "ADMIN" },
                    { "8b4b4d1e-3a0d-40dc-b1d7-6fe277adec78", null, "User", "USER" }
                });
        }
    }
}
