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
  // console.log("searchResults: ", searchResults);

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function getBooks() {
    dispatch(searchBooks(searchTerm));
  }

  async function updateBook(book) {
    console.log("Book Info: ", book);
    await dispatch(createBook(book));
    await getBooks();
  }

  return (
    <div>
      <div className="input">
        <label> Search your book</label>
        <br />
        <br />
        <input
          className="searchInput"
          type="search"
          value={searchTerm}
          name="searchText"
          placeholder="Search books"
          onChange={onSearchTermChange}
        />
        <button onClick={getBooks}> search</button>
      </div>
      <div className="container">
        {searchResults.map((book) => {
          return (
            <div className="searchResult" key={book.googleID}>
              <Book
                googleID={book.googleID}
                title={book.title}
                authors={book.authors}
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

export default SearchPage;
