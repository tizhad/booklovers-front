import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);

  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });


  const randomBooksQuery = []
  const randomBooks = userBooks.filter((book) => {
    return book.status === "to-read" && book.progress === null;
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
        Random Books for you!{" "}
      </p>
      {/* <div className="container2">
        {randomBooks.map((book) => {
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
      </div> */}
    </div>
  );
};

export default HomePage;
