import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import "./MyBooks.css";

const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });
  const FinishedBooks = userBooks.filter((book) => {
    return book.status === "read";
  });
  const notStarted = userBooks.filter((book) => {
    return book.status === "to-read";
  });

  useEffect(() => {
    dispatch(getUserBooks());
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
      <div className="container2">
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
        You finished {FinishedBooks.length} books{" "}
      </p>
      <div className="container2">
        {FinishedBooks.map((book) => {
          return (
            <Book
              key={book.googleID}
              googleID={book.googleID}
              title={book.title}
              authors={book.author}
              imageURL={book.imageURL}
              rate={book.rate}
              status={book.status}
              progress={book.progress}
              description={book.description}
              onUpdateBook={updateBook}
            />
          );
        })}
      </div>
      <p className="subTitles">
        <span role="img" aria-label="book">
          &#128218;
        </span>{" "}
        {notStarted.length} books for starting.
      </p>
      <div className="container2">
        {notStarted.map((book) => {
          return (
            <div>
              <Book
                key={book.googleID}
                googleID={book.googleID}
                title={book.title}
                authors={book.author}
                imageURL={book.imageURL}
                rate={book.rate}
                status={book.status}
                progress={book.progress}
                description={book.description}
                onUpdateBook={updateBook}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBooks;
