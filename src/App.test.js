import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

describe("App component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(getByText("Book Lovers")).toBeInTheDocument();
  });

  // it("dispatches the getUserWithStoredToken action on component mount", () => {
  //   const mockDispatch = jest.fn();
  //   jest.mock("react-redux", () => {
  //     return {
  //       useDispatch: () => mockDispatch,
  //       useSelector: () => false,
  //     };
  //   });
  //
  //   render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //   );
  //
  //   expect(mockDispatch).toHaveBeenCalledWith(getUserWithStoredToken());
  // });
  //
  // it("shows the loading component when the app is loading", () => {
  //   const { getByText } = render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //   );
  //   expect(getByText("Loading")).not.toBeInTheDocument();
  //
  //   jest.mock("react-redux", () => {
  //     return {
  //       useDispatch: () => jest.fn(),
  //       useSelector: () => true,
  //     };
  //   });
  //
  //   const { getByText } = render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //   );
  //   expect(getByText("Loading")).toBeInTheDocument();
  // });
});
