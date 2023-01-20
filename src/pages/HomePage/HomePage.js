import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";
import Book from "../../components/Book/Book";
import { Col, Container } from "react-bootstrap";

const HomePage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();

  let errorMessage = "";
  let result = null;
  let books = [];

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    await axios.get(`${apiUrl}/randomBooks`).then((response) => {
      if (response.data.length > 0) {
        randomBooks(books);
      } else {
        errorMessage = "error";
      }
    });
  };

  const randomBooks = (response) => {
    console.log(response, "random book callled");
    books = response;
  };

  return (
    <Container>
      {books.map((book) => (
        <Col className="my-1" key={book.id}>
          <Book
            googleID={book.googleID}
            categories={book.categories}
            title={book.title}
            authors={book.authors}
            imageURL={book.imageURL}
            rate={book.rate}
            status={book.status}
            description={book.description}
          />
        </Col>
      ))}
    </Container>
  );
};
export default HomePage;
