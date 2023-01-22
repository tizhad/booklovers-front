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
});
