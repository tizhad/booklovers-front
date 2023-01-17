import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooks } from "../../store/userBook/actions";
import { getSuggestions } from "../../store/book/actions";
import { selectUserBooks } from "../../store/userBook/selectors";
import { selectSuggestions } from "../../store/book/selectors";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";

const HomePage = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const suggestions = useSelector(selectSuggestions);

  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });
  // GEt books and suggestions after every render
  useEffect(
    (userBooks) => {
      dispatch(getUserBooks());
      dispatch(getSuggestions());
    },
    [dispatch]
  );

  // Update a book
  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }
  return (
    <div>
      {inProgressBooks.map((book) => (
        <Book
          key={book.googleID}
          googleID={book.googleID}
          title={book.title}
          authors={book.author}
          imageURL={book.imageURL}
          status={book.status}
          rate={book.rate}
          progress={book.progress}
          categories={book.categories}
          onUpdateBook={updateBook}
        />
      ))}
      <h1>Book Lovers suggestions</h1>
      {suggestions.map((book) => (
        <Book
          key={book.googleID}
          googleID={book.googleID}
          categories={book.categories}
          title={book.title}
          authors={book.authors}
          imageURL={book.imageURL}
          rate={book.rate}
          status={book.status}
          description={book.description}
          onUpdateBook={updateBook}
        />
      ))}
    </div>
  );
};
export default HomePage;
