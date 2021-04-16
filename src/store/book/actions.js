import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "../user/selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/actions";

export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_RANDOM_BOOKS = "SET_RANDOM_BOOKS";

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

const randomQueries = [
  "The Power of Habit",
  "Harry Potter",
  "What is a Woman?",
  "Girl, Woman, Other",
  "Pride and Prejudice",
  "the personal MBA",
  "outliers",
  "The Black Swan",
  "The Code Breaker",
  "Elon Musk",
  "Zero to One",
  "The 4-Hour Workweek",
];

export const getRandomBooks = () => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    let randomQuery =
      randomQueries[Math.floor(Math.random() * randomQueries.length)];
    console.log(randomQuery);

    dispatch(appLoading());
    try {
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get(`${apiUrl}/search?q=${randomQuery}`, headers);
      dispatch(setRandomBooks(res.data));
      console.log("res.data:", res.data);
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

const setSearchResults = (searchResults) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: searchResults,
  };
};

const setRandomBooks = (randomBooks) => {
  return {
    type: SET_RANDOM_BOOKS,
    payload: randomBooks,
  };
};
