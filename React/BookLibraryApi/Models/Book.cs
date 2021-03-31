namespace BookLibraryApi.Models
{
    public class Book
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public BookCategory BookCategory { get; set; }
        public Author Author { get; set; }
    }
}