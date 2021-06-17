import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBooks } from "../../store/userBook/selectors";
import { getUserBooks } from "../../store/userBook/actions";
import { createBook } from "../../store/book/actions";
import Book from "../../components/Book/Book";
import { Container, Row, Col } from "react-bootstrap";

const MyBooks = () => {
  const dispatch = useDispatch();
  const userBooks = useSelector(selectUserBooks);

  //In-progress books
  const inProgressBooks = userBooks.filter((book) => {
    return book.status === "reading";
  });

  //Finished books
  const FinishedBooks = userBooks.filter((book) => {
    return book.status === "read";
  });

  //ot-started books

  const notStarted = userBooks.filter((book) => {
    return book.status === "to-read";
  });

  // get all users books
  useEffect(() => {
    dispatch(getUserBooks());
  }, [dispatch]);

  async function updateBook(book) {
    await dispatch(createBook(book));
    await dispatch(getUserBooks());
  }

  return (
    <Container>
      <Row>
        <h1 className="h-color">
          You're reading {inProgressBooks.length} books
        </h1>
      </Row>
      <Row className="g-2">
        {inProgressBooks.map((book) => (
          <Col md={4} lg={3} sm={6} xs={12} key={book.googleID}>
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
          </Col>
        ))}
      </Row>
      <Row>
        <h2 className="h-color">You finished {FinishedBooks.length} books </h2>
      </Row>
      <Row className="g-2">
        {FinishedBooks.map((book) => (
          <Col md={4} lg={3} sm={6} xs={12} key={book.googleID}>
            <Book
              key={book.googleID}
              googleID={book.googleID}
              categories={book.categories}
              title={book.title}
              authors={book.author}
              imageURL={book.imageURL}
              rate={book.rate}
              status={book.status}
              progress={book.progress}
              description={book.description}
              onUpdateBook={updateBook}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <h1 className="h-color">{notStarted.length} books for starting.</h1>
      </Row>
      <Row className="g-2">
        {notStarted.map((book) => (
          <Col
            md={4}
            lg={3}
            sm={6}
            xs={12}
            key={book.googleID}
            className="my-1"
          >
            <Book
              key={book.googleID}
              googleID={book.googleID}
              categories={book.categories}
              title={book.title}
              authors={book.author}
              imageURL={book.imageURL}
              rate={book.rate}
              status={book.status}
              progress={book.progress}
              description={book.description}
              onUpdateBook={updateBook}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyBooks;
