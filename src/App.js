import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector, Provider } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import Search from "./pages/SearchPage/Search";
import MyBooks from "./pages/MyBooks/MyBooks";
import HomePage from "./pages/HomePage/HomePage";
import store from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <MessageBox />
        {isLoading ? <Loading /> : null}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/my-books" component={MyBooks} />
        </Switch>
      </div>
    </Provider>
  );
}

export default App;
