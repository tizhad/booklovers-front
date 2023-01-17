import React from "react";
import Book from "../Book/Book";
import Grid from "@mui/material/Grid";

const InProgressBooks = ({ books, updateBook }) => {
  const inProgressBooks = books.filter((book) => book.status === "reading");
  return (
    <>
      <h6 className="mb-4">In Progress</h6>
      <Grid container spacing={3}>
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

export default InProgressBooks;
