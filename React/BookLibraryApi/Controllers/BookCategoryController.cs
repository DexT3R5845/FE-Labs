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
    public class BookCategoryController : ControllerBase
    {
        private readonly BookLibraryDbContext _context;

        public BookCategoryController(BookLibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/bookcategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookCategory>>> GetBookCategory()
        {
            return await _context.BookCategory.OrderByDescending(category => category.Id).ToListAsync();

        }

        // GET: api/bookcategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookCategory>> GetBookCategory(long id)
        {
            var BookCategory = await _context.BookCategory.FindAsync(id);

            if (BookCategory == null)
            {
                return NotFound();
            }

            return BookCategory;
        }

        // POST: api/bookcategory
        [HttpPost]
        public async Task<ActionResult<BookCategory>> PostBookCategory(BookCategory item)
        {
            _context.BookCategory.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookCategory), new { id = item.Id }, item);
        }

        // PUT: api/bookcategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookCategory(long id, BookCategory item)
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
        public async Task<IActionResult> DeleteBookCategory(long id)
        {
            var bookCategory = await _context.BookCategory.FindAsync(id);

            if (bookCategory == null)
            {
                return NotFound();
            }

            _context.BookCategory.Remove(bookCategory);

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateException)
            {
                return BadRequest(new { ErrorCode = "DbUpdateException", ErrorMessage = "Must delete products before deleting category" } );
            }
        }

        // DELETE: api/bookcategory/5/1
        [HttpDelete("{id}/{deleteType}")]
        public async Task<IActionResult> DeleteBookCategoryWithBook(long id, int deleteType)
        {
            var bookCategory = await _context.BookCategory.FindAsync(id);

            if (bookCategory == null)
            {
                return NotFound();
            }

            _context.BookCategory.Remove(bookCategory);

            var books = await _context.Book
                            .Where(x => x.BookCategory.Id == bookCategory.Id)
                            .ToListAsync();

            if (deleteType == 1) // delete books
            {
                _context.Book.RemoveRange(books);
            }
            else if (deleteType == 2) // only empty authors
            {
                foreach(var book in books) {
                    book.BookCategory = null;
                }
            } 

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
