import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_SUGGESTIONS_RESULTS = "SET_SUGGESTIONS_RESULTS";

export const searchBooks = (searchTerm) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${apiUrl}/search?q=${searchTerm}`, headers);

      dispatch(setSearchResults(res.data));
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

export const getAllUserBooks = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(apiUrl, headers);
      console.log("res.data:", res.data);
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

export const createBook = (bookInfo) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post(`${apiUrl}/books`, bookInfo, headers);

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
// book suggestions based on user's books categories
export const getSuggestions = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${apiUrl}/suggestions`, headers);

      dispatch(setSuggestionsResults(res.data));
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

const setSuggestionsResults = (suggestionsResults) => {
  return {
    type: SET_SUGGESTIONS_RESULTS,
    payload: suggestionsResults,
  };
};

const setSearchResults = (searchResults) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: searchResults,
  };
};
