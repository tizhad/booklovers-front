import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBooks } from "../../store/userBook/actions";
import { getSuggestions } from "../../store/book/actions";
import { selectUserBooks } from "../../store/userBook/selectors";
import { selectSuggestions } from "../../store/book/selectors";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import { Container, Row, Col } from "react-bootstrap";

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
    <Container>
      <Row>
        <h1 className=" my-3 h-color">
          {" "}
          You're reading {inProgressBooks.length} books
        </h1>
      </Row>
      <Row className="g-2 ">
        {inProgressBooks.map((book) => (
          <Col
            md={4}
            lg={3}
            sm={6}
            xs={12}
            className=" my-1"
            key={book.googleID}
          >
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
          </Col>
        ))}
      </Row>
      <Row>
        <h1 className=" my-3 h-color">Book Lovers suggestions for you</h1>
      </Row>
      <Row className="g-2">
        {suggestions.map((book) => (
          <Col
            md={4}
            lg={3}
            sm={6}
            xs={12}
            className=" my-1"
            key={book.googleID}
          >
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
