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
    public class AuthorController : ControllerBase
    {
        private readonly BookLibraryDbContext _context;

        public AuthorController(BookLibraryDbContext context)
        {
            _context = context;
        }

        // GET: api/bookcategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthor()
        {
            return await _context.Author.OrderByDescending(author => author.Id).ToListAsync();
        }

        // GET: api/bookcategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(long id)
        {
            var Author = await _context.Author.FindAsync(id);

            if (Author == null)
            {
                return NotFound();
            }

            return Author;
        }

        // POST: api/bookcategory
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author item)
        {
            _context.Author.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAuthor), new { id = item.Id }, item);
        }

        // PUT: api/bookcategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(long id, Author item)
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
        public async Task<IActionResult> DeleteAuthor(long id)
        {
            var author = await _context.Author.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            _context.Author.Remove(author);

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
        public async Task<IActionResult> DeleteAuthorWithBook(long id, int deleteType)
        {
            var author = await _context.Author.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            _context.Author.Remove(author);

            var books = await _context.Book
                            .Where(x => x.Author.Id == author.Id)
                            .ToListAsync();

            if (deleteType == 1) // delete books
            {
                _context.Book.RemoveRange(books);
            }
            else if (deleteType == 2) // only empty authors
            {
                foreach(var book in books) {
                    book.Author = null;
                }
            } 

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
