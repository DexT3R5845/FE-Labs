import { GET_BOOK_CATEGORIES, ADD_BOOK_CATEGORY, UPDATE_BOOK_CATEGORY, DELETE_BOOK_CATEGORY} from '../actions/types';

const initialState = []

export default function(state = { bookCategories: initialState }, action) {
  switch(action.type) {
    case GET_BOOK_CATEGORIES:
      return {...state, bookCategories: action.payload};
    case ADD_BOOK_CATEGORY:
      return {...state, bookCategories: [action.payload, ...state.bookCategories]};
    case UPDATE_BOOK_CATEGORY:
      var foundIndex = state.bookCategories.findIndex(x => x.id == action.payload.id);
      state.bookCategories[foundIndex] = action.payload;
      return {...state};
    case DELETE_BOOK_CATEGORY:
          var foundIndex = state.bookCategories.findIndex(x => x.id == action.payload.id);
          state.bookCategories.splice(foundIndex, 1);
          return {...state};
    default:
      return state;
  }
}