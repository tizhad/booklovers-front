import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const SET_USER_BOOKS = "SET_USER_BOOKS";

export const getUserBooks = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${apiUrl}/userBooks`, headers);
      dispatch(setUserBooks(res.data));

      dispatch(showMessageWithTimeout("success", true, "user books fetched"));

      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

const setUserBooks = (userBooks) => {
  return {
    type: SET_USER_BOOKS,
    payload: userBooks,
  };
};
