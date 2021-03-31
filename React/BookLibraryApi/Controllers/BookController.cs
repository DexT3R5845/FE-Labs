using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookLibraryApi.Models;
using Microsoft.EntityFrameworkCore;


namespace BookLibraryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookLibraryDbContext _context;

        public BookController(BookLibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/bookcategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetBook()
        {
            var books = await _context.Book
                            .Include(book => book.BookCategory)
                            .Include(book => book.Author)
                            .ToListAsync();

            var result = (from book in books
                          select new
                          {
                              Id = book.Id,
                              Name = book.Name,
                              BookCategoryId = book.BookCategory != null ? (long?)book.BookCategory.Id : null,
                              AuthorId = book.Author != null ? (long?)book.Author.Id : null,
                          }).OrderByDescending(book => book.Id).ToList();

            return result;
        }

        // GET: api/bookcategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(long id)
        {
            var Book = await _context.Book.FindAsync(id);

            if (Book == null)
            {
                return NotFound();
            }

            return Book;
        }

        // POST: api/bookcategory
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book item)
        {
            item.BookCategory = await _context.BookCategory.FirstOrDefaultAsync(c => c.Id == item.BookCategory.Id);
            item.Author = await _context.Author.FirstOrDefaultAsync(a => a.Id == item.Author.Id);

            _context.Book.Add(item);
            await _context.SaveChangesAsync();

            var newBook = new
            {
                Id = item.Id,
                Name = item.Name,
                BookCategoryId = item.BookCategory != null ? (long?)item.BookCategory.Id : null,
                AuthorId = item.Author != null ? (long?)item.Author.Id : null,
            };

            return CreatedAtAction(nameof(GetBook), new { id = item.Id }, newBook);
        }

        // PUT: api/bookcategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(long id, Book item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/bookcategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(long id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
