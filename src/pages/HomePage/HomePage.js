import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Book from "../../components/Book/Book";
import { Row, Col, Container } from "react-bootstrap";
import { selectRandomBooks } from "../../store/book/selectors";
import { getRandomBooks } from "../../store/book/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const randomBooks = useSelector(selectRandomBooks);
  const history = useHistory();

  useEffect(
      () => {
        dispatch(getRandomBooks());
      },
      [dispatch]
  );
  function updateBook() {
      history.push('/login')
    }


  return (
    <Container>
        <Row className="g-3">
      {randomBooks.map((book) => (
        <Col className="my-1" key={book.id}>
          <Book
            googleID={book.id}
            categories={book.categories}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors[0]}
            imageURL={book.volumeInfo.imageLinks.smallThumbnail}
            rate={book.rate}
            status={book.status}
            description={book.volumeInfo.description}
            onUpdateBook ={updateBook}
          />
        </Col>
      ))}
        </Row>
    </Container>
  );
};
export default HomePage;
