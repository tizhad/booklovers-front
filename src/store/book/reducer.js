import { SET_SEARCH_RESULTS } from "./actions";
import { SET_RANDOM_BOOKS } from "./actions";

const initialState = {
  searchResults: [],
  randomBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_RANDOM_BOOKS:
      return { ...state, randomBooks: action.payload };
    default:
      return state;
  }
};
