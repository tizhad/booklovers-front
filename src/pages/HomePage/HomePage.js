import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooks } from "../../store/userBook/actions";
import { getSuggestions } from "../../store/book/actions";
import { selectUserBooks } from "../../store/userBook/selectors";
import { selectSuggestions } from "../../store/book/selectors";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const suggestions = useSelector(selectSuggestions);
  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });

  useEffect(() => {
    dispatch(getUserBooks());
    dispatch(getSuggestions());
  }, [dispatch]);

  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  return (
    <div>
      <p className="subTitles">
        <span role="img" aria-label="book">
          &#128214;
        </span>{" "}
        You're reading {inProgressBooks.length} books{" "}
      </p>
      <div className="container-home">
        {inProgressBooks.map((book) => {
          return (
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
          );
        })}
        <hr></hr>
      </div>
      <p className="subTitles">
        <span role="img" aria-label="book">
          &#128218;
        </span>{" "}
        Random Books for you!{" "}
      </p>
      <div className="container-home">
        {suggestions.map((book) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
