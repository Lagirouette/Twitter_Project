using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddingThingsToLike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "LikeBy",
                table: "Likes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "856c3fcb-e60b-4975-86f3-d98a3db22b64", null, "Admin", "ADMIN" },
                    { "8b4b4d1e-3a0d-40dc-b1d7-6fe277adec78", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_PostId",
                table: "Likes",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_Likes_Posts_PostId",
                table: "Likes",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Likes_Posts_PostId",
                table: "Likes");

            migrationBuilder.DropIndex(
                name: "IX_Likes_PostId",
                table: "Likes");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "856c3fcb-e60b-4975-86f3-d98a3db22b64");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8b4b4d1e-3a0d-40dc-b1d7-6fe277adec78");

            migrationBuilder.DropColumn(
                name: "LikeBy",
                table: "Likes");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Likes");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "954b3a60-e278-49ef-8a18-ea7606a601df", null, "Admin", "ADMIN" },
                    { "de676097-1041-4b72-8adf-b75014acf8a8", null, "User", "USER" }
                });
        }
    }
}
