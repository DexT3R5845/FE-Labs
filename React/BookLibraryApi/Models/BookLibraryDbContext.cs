using Microsoft.EntityFrameworkCore;

namespace BookLibraryApi.Models
{
    public class BookLibraryDbContext : DbContext
    {
        public BookLibraryDbContext(DbContextOptions<BookLibraryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Author> Author { get; set; }
        public DbSet<BookCategory> BookCategory { get; set; }
        public DbSet<Book> Book { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Author>(options =>
            {
                options.HasData(
                    new Author { Id = 1, Name = "Harper Lee" },
                    new Author { Id = 2, Name = "George Orwell" },
                    new Author { Id = 3, Name = "J.K. Rowling" },
                    new Author { Id = 4, Name = "J.R.R. Tolkien" },
                    new Author { Id = 5, Name = "F. Scott Fitzgerald" },
                    new Author { Id = 6, Name = "Jane Austen" },
                    new Author { Id = 7, Name = "Anne Frank" },
                    new Author { Id = 8, Name = "Markus Zusak" },
                    new Author { Id = 9, Name = "Louisa May Alcott" });
            });

            modelBuilder.Entity<BookCategory>(options =>
            {
                options.HasData(
                    new BookCategory { Id = 1, Name = "Science Fiction" },
                    new BookCategory { Id = 2, Name = "Thriller" },
                    new BookCategory { Id = 3, Name = "Fantasy Fiction" },
                    new BookCategory { Id = 4, Name = "Fiction" },
                    new BookCategory { Id = 5, Name = "Romance" },
                    new BookCategory { Id = 6, Name = "Historical Fiction" },
                    new BookCategory { Id = 7, Name = "Comedy" });
            });

            modelBuilder.Entity<Book>(options =>
            {
                options.HasData(
                    new { Id = (long)1, BookCategoryId = (long)1, AuthorId = (long)1, Name = "To Kill a Mockingbird" },
                    new { Id = (long)2, BookCategoryId = (long)2, AuthorId = (long)2, Name = "1984" },
                    new { Id = (long)3, BookCategoryId = (long)3, AuthorId = (long)3, Name = "Harry Potter and the Philosopher’s Stone" },
                    new { Id = (long)4, BookCategoryId = (long)3, AuthorId = (long)4, Name = "The Lord of the Rings" },
                    new { Id = (long)5, BookCategoryId = (long)4, AuthorId = (long)5, Name = "The Great Gatsby" },
                    new { Id = (long)6, BookCategoryId = (long)5, AuthorId = (long)6, Name = "Pride and Prejudice" },
                    new { Id = (long)7, BookCategoryId = (long)5, AuthorId = (long)7, Name = "The Diary Of A Young Girl" },
                    new { Id = (long)8, BookCategoryId = (long)6, AuthorId = (long)8, Name = "The Book Thief" },
                    new { Id = (long)9, BookCategoryId = (long)3, AuthorId = (long)4, Name = "The Hobbit" },
                    new { Id = (long)10, BookCategoryId = (long)7, AuthorId = (long)9, Name = "Little Women" });
            });
        }
    }
}