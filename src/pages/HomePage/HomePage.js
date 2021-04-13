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

  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  return (
    <div>
      <div className="container">
        {inProgressBooks.map((book) => {
          return (
            <div key={book.googleID}>
              <Book
                googleID={book.googleID}
                title={book.title}
                authors={book.author}
                imageURL={book.imageURL}
                status={book.status}
                rate={book.rate}
                progress={book.progress}
                onUpdateBook={updateBook}
              />
            </div>
          );
        })}
      </div>
      <div className="test">
        {userBooks.map((book) => {
          return (
            <div key={book.googleID}>
              <Book
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

export default HomePage;
