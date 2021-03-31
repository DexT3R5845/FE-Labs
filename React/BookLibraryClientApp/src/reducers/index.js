import { combineReducers } from 'redux';
import BookReducer from './book-reducer';
import BookCategoryReducer from './book-category-reducer';
import Author from './author-reducer';

const rootReducer = combineReducers({
  book: BookReducer,
  bookCategory: BookCategoryReducer,
  author: Author
});

export default rootReducer;