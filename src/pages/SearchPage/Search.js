import React from "react";
import axios from "axios";
import "./Search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../store/user/actions";
import { apiUrl } from "../../config/constants";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  async function getBooks() {
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const res = await axios.get(`${apiUrl}/search?q=${searchTerm}`, headers);

    setSearchTerm(searchTerm);
    setBooks(res.data);
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
            <div className="searchResult" key={book.googleID}>
              <img
                className="bookSearchImage"
                alt={book.title}
                src={book.imageURL || "https://via.placeholder.com/150"}
              ></img>
              <h3>{book.title}</h3>
              {/* <p>{book.volumeInfo.authors}</p> */}
              <p>{book.rate}</p>
              <p>{book.description}</p>
              <p>{book.status}</p>
              <p>{book.progress}</p>
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
