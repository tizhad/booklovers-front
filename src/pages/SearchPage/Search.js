import React from "react";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Book from "../../components/Book/Book";
import { createBook, searchBooks } from "../../store/book/actions";
import { selectSearchResult } from "../../store/book/selectors";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResult);

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("searchTerm", searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchBooks(searchTerm));
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
    <div>
      <div className="search__container">
        <p className="search__title">Go ahead, hover over search</p>
        <input
          className="search__input"
          type="text"
          value={searchTerm}
          name=""
          placeholder="Search"
          onChange={onSearchTermChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="container3">
        {searchResults.map((book) => {
          return (
            <div className="search-result-books" key={book.googleID}>
              <Book
                googleID={book.googleID}
                title={book.title}
                authors={book.authors}
                imageURL={book.imageURL}
                rate={book.rate}
                status={book.status}
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

export default SearchPage;
