import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";

const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);

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

export default MyBooks;
