using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TwitterAppWebApi.Migrations
{
    /// <inheritdoc />
    public partial class ChangingTypeImageIdInOtherTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Posts",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Comments",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_ImageId",
                table: "Posts",
                column: "ImageId",
                unique: true,
                filter: "[ImageId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ImageId",
                table: "Comments",
                column: "ImageId",
                unique: true,
                filter: "[ImageId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Images_ImageId",
                table: "Comments",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Images_ImageId",
                table: "Posts",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Images_ImageId",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Images_ImageId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ImageId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Comments_ImageId",
                table: "Comments");

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ImageId",
                table: "Comments",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

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
    }
}
