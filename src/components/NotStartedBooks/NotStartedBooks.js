import React from "react";
import Grid from "@mui/material/Grid";
import Book from "../Book/Book";

const NotStartedBooks = ({ books, updateBook }) => {
  const inProgressBooks = books.filter((book) => book.status === "to-read");
  return (
    <>
      <h6 className="mb-4">Not Started</h6>
      <Grid container spacing={4}>
        {inProgressBooks.map((book) => (
          <Book
            key={book.googleID}
            categories={book.categories}
            googleID={book.googleID}
            title={book.title}
            authors={book.author}
            imageURL={book.imageURL}
            status={book.status}
            rate={book.rate}
            progress={book.progress}
            onUpdateBook={updateBook}
          />
        ))}
      </Grid>
    </>
  );
};

export default NotStartedBooks;
