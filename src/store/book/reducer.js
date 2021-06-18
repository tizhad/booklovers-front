import { SET_SEARCH_RESULTS, SET_SUGGESTIONS_RESULTS } from "./actions";

const initialState = {
  searchResults: [],
  suggestionsResults: [],
  randomBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case SET_SUGGESTIONS_RESULTS:
      return { ...state, suggestionsResults: action.payload };
    default:
      return state;
  }
};
