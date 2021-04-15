import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooks } from "../../store/userBook/actions";
import { selectUserBooks } from "../../store/userBook/selectors";
import { selectRandomBooks } from "../../store/book/selectors";
import { createBook, getRandomBooks } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);
  const randomBooks = useSelector(selectRandomBooks);

  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });

  const allRandomBooks = randomBooks.filter((book) => {
    return book.author !== null && book.description !== null;
  });

  useEffect(() => {
    dispatch(getUserBooks());
    dispatch(getRandomBooks());
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
      <div className="randomBooks container2">
        {allRandomBooks.map((book) => {
          return (
            <Book
              key={book.googleID}
              googleID={book.googleID}
              title={book.title}
              authors={book.authors}
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
    </div>
  );
};

export default HomePage;
