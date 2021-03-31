using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BookLibraryApi.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Author",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Author", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookCategory",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    BookCategoryId = table.Column<long>(nullable: true),
                    AuthorId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Book_Author_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Author",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Book_BookCategory_BookCategoryId",
                        column: x => x.BookCategoryId,
                        principalTable: "BookCategory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Author",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1L, "Harper Lee" },
                    { 2L, "George Orwell" },
                    { 3L, "J.K. Rowling" },
                    { 4L, "J.R.R. Tolkien" },
                    { 5L, "F. Scott Fitzgerald" },
                    { 6L, "Jane Austen" },
                    { 7L, "Anne Frank" },
                    { 8L, "Markus Zusak" },
                    { 9L, "Louisa May Alcott" }
                });

            migrationBuilder.InsertData(
                table: "BookCategory",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1L, "Science Fiction" },
                    { 2L, "Thriller" },
                    { 3L, "Fantasy Fiction" },
                    { 4L, "Fiction" },
                    { 5L, "Romance" },
                    { 6L, "Historical Fiction" },
                    { 7L, "Comedy" }
                });

            migrationBuilder.InsertData(
                table: "Book",
                columns: new[] { "Id", "AuthorId", "BookCategoryId", "Name" },
                values: new object[,]
                {
                    { 1L, 1L, 1L, "To Kill a Mockingbird" },
                    { 2L, 2L, 2L, "1984" },
                    { 3L, 3L, 3L, "Harry Potter and the Philosopher’s Stone" },
                    { 4L, 4L, 3L, "The Lord of the Rings" },
                    { 9L, 4L, 3L, "The Hobbit" },
                    { 5L, 5L, 4L, "The Great Gatsby" },
                    { 6L, 6L, 5L, "Pride and Prejudice" },
                    { 7L, 7L, 5L, "The Diary Of A Young Girl" },
                    { 8L, 8L, 6L, "The Book Thief" },
                    { 10L, 9L, 7L, "Little Women" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Book_AuthorId",
                table: "Book",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Book_BookCategoryId",
                table: "Book",
                column: "BookCategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropTable(
                name: "Author");

            migrationBuilder.DropTable(
                name: "BookCategory");
        }
    }
}
