import { render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import HomePage from "./HomePage";

const mockStore = configureMockStore();

describe("HomePage", () => {
    test("dispatches get random books on load", () => {
        const store = mockStore({});
        render(
            <Provider store={store}>
                <HomePage/>
            </Provider>
        );

        expect(store.getActions()).toContainEqual(getRandomBooks());
    });

    test("renders books", () => {
        const mockRandomBooks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const store = mockStore({
            book: {
                randomBooks: mockRandomBooks
            }
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        mockRandomBooks.forEach((book) => {
            expect(screen.getByTestId(`book-${book.id}`)).toBeInTheDocument();
        });
    });
});
