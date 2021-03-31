import { GET_BOOKS, ADD_BOOK, UPDATE_BOOK, DELETE_BOOK } from '../actions/types';

const initialState = []

export default function(state = { books: initialState }, action) {
  switch(action.type) {
    case GET_BOOKS:
      return {...state, books: action.payload};
    case ADD_BOOK:
      return {...state, books: [action.payload, ...state.books]};
    case UPDATE_BOOK:
      var foundIndex = state.books.findIndex(x => x.id == action.payload.id);
      state.books[foundIndex] = action.payload;
      return {...state};
    case DELETE_BOOK:
          var foundIndex = state.books.findIndex(x => x.id == action.payload.id);
          state.books.splice(foundIndex, 1);
          return {...state};
    default:
      return state;
  }
}