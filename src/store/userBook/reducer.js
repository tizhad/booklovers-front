import { SET_USER_BOOKS } from "./actions";

const initialState = {
  userBooks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_BOOKS:
      return { ...state, userBooks: action.payload };
    default:
      return state;
  }
};
