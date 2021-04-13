import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import book from "./book/reducer";

export default combineReducers({
  appState,
  user,
  book,
});
