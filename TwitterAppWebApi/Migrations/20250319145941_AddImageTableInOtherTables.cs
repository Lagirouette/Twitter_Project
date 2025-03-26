using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddImageTableInOtherTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CommentId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageId",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_CommentId",
                table: "Images",
                column: "CommentId",
                unique: true,
                filter: "[CommentId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Images_PostId",
                table: "Images",
                column: "PostId",
                unique: true,
                filter: "[PostId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Comments_CommentId",
                table: "Images",
                column: "CommentId",
                principalTable: "Comments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Posts_PostId",
                table: "Images",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Comments_CommentId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Posts_PostId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_CommentId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_PostId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CommentId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ImageId",
                table: "Comments");
        }
    }
}
