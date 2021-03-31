import { GET_AUTHORS, ADD_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR } from '../actions/types';

const initialState = []

export default function(state = { authors: initialState }, action) {
  switch(action.type) {
    case GET_AUTHORS:
      return {...state, authors: action.payload};
    case ADD_AUTHOR:
      return {...state, authors: [action.payload, ...state.authors]};
    case UPDATE_AUTHOR:
      var foundIndex = state.authors.findIndex(x => x.id == action.payload.id);
      state.authors[foundIndex] = action.payload;
      return {...state};
    case DELETE_AUTHOR:
          var foundIndex = state.authors.findIndex(x => x.id == action.payload.id);
          state.authors.splice(foundIndex, 1);
          return {...state};
    default:
      return state;
  }
}