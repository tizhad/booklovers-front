import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const SET_USER_BOOKS = "SET_USER_BOOKS";

export const getUserBooks = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${apiUrl}/userBooks`, headers);

      dispatch(setUserBooks(res.data));
      dispatch(appDoneLoading());
    } catch (error) {
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
