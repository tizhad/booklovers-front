import { SET_SEARCH_RESULTS } from "./actions";

const initialState = {
  searchResults: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };

    default:
      return state;
  }
};
