import React from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Book from "../../components/Book/Book";
import { createBook, searchBooks } from "../../store/book/actions";
import { selectSearchResult } from "../../store/book/selectors";
import {
  Row,
  Col,
  Container,
  Jumbotron,
  InputGroup,
  FormControl,
} from "react-bootstrap";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResult);

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchBooks(e.target.value));
    }
  };
  function getBooks() {
    dispatch(searchBooks(searchTerm));
  }

  async function updateBook(book) {
    await dispatch(createBook(book));
    await getBooks();
  }

  return (
    <Container>
      <Jumbotron>
        <Container className="my-5 header">
          <h1>Go ahead, hover over search</h1>
        </Container>
      </Jumbotron>
      <Row className="py-3">
        <Col md={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="search"
              aria-label="search"
              aria-describedby="basic-addon2"
              onChange={onSearchTermChange}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="g-3">
        {searchResults.map((book) => {
          return (
            <Col md={3} lg={3} sm={6} xs={12} key={book.googleID}>
              <Book
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
          );
        })}
      </Row>
    </Container>
  );
}
