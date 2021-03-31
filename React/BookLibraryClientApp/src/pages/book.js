import React, { useEffect } from "react";
import MaterialTable from 'material-table';
import { useSelector, useDispatch } from 'react-redux'
import { getBooks, addBook, updateBook, deleteBook } from '../actions/book-action';
import { getAuthors } from '../actions/author-action';
import { getBookCategories } from '../actions/book-category-action';
import { arrayToObject } from '../utils';

const Book = () => {
  const dispatch = useDispatch();
  const bookData = useSelector(state => state.book)
  const authorData = useSelector(state => state.author)
  const bookCategoryData = useSelector(state => state.bookCategory)

  const columns = [
    { title: 'Name', field: 'name' },
    {
      title: 'Author',
      field: 'authorId',
      lookup: arrayToObject(authorData.authors)
    },
    {
      title: 'Category',
      field: 'bookCategoryId',
      lookup: arrayToObject(bookCategoryData.bookCategories)
    },
  ];

  useEffect(() => {
    getBooks(dispatch);
    getAuthors(dispatch);
    getBookCategories(dispatch);
  }, []);

  return (
    <MaterialTable
      title="Books"
      columns={columns}
      data={bookData.books}
      options={{
        addRowPosition: "first"
      }}
      editable={{
        onRowAdd: newData => {
          const bookCategory = bookCategoryData.bookCategories.filter(bookCategory => bookCategory.id == newData.bookCategoryId);
          const author = authorData.authors.filter(author => author.id == newData.authorId);
          const newBook = {
            name: newData.name,
            bookCategory: bookCategory[0],
            author: author[0]
          }
          return addBook(dispatch, newBook);
        },
        onRowUpdate: newData => updateBook(dispatch, newData),
        onRowDelete: oldData => deleteBook(dispatch, oldData),
      }}
    />
  );
}

export default Book;