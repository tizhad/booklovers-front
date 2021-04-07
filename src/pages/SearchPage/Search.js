import React from "react";
import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../store/user/actions";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  // const [bookStatus, setBookStatus] = useState("");

  async function getBooks() {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );

    const englishResults = res.data.items.filter((book) => {
      if (book.volumeInfo.language === "en") {
        return true;
      } else {
        return false;
      }
    });

    setBooks(englishResults);
    setSearchTerm(searchTerm);
  }
  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function addToBooks(book) {
    const bookInfo = {
      uniqueId: book.id,
      title: book.volumeInfo.title,
      imageURL: book.volumeInfo.imageLinks.thumbnail,
      description: book.volumeInfo.description,
    };
    console.log(bookInfo);
    dispatch(createBook(bookInfo));
  }

  return (
    <div>
      <div className="input">
        <label> Search your books</label>
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
        {books.map((book) => {
          return (
            <div className="searchResult" key={book.id}>
              <img
                alt={book.volumeInfo.title}
                src={
                  book.volumeInfo.imageLinks.smallThumbnail ||
                  "https://via.placeholder.com/150"
                }
              ></img>
              <h1>{book.title}</h1>
              <p>{book.volumeInfo.authors}</p>
              <p>{book.volumeInfo.language}</p>
              <p>{book.volumeInfo.averageRating}</p>
              {/* <p>{book.volumeInfo.description}</p> */}
              <button className="button" onClick={() => addToBooks(book)}>
                Want to read
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
