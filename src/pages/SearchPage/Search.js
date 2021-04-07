import React from "react";
import axios from "axios";
import "./Search.css";
import { useState } from "react";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getResults() {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );

    const englishResults = res.data.items.filter((result) => {
      if (result.volumeInfo.language === "en") {
        return true;
      } else {
        return false;
      }
    });
    setResults(englishResults);
    console.log(englishResults);

    setSearchTerm(searchTerm);
  }
  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
        <button onClick={getResults}> search</button>
      </div>
      <div className="container">
        {results.map((result) => {
          return (
            <div className="searchResult" key={result.id}>
              <img
                alt={result.volumeInfo.title}
                src={
                  result.volumeInfo.imageLinks.smallThumbnail ||
                  "https://via.placeholder.com/150"
                }
              ></img>
              <h1>{result.title}</h1>
              <p>{result.volumeInfo.authors}</p>
              <p>{result.volumeInfo.language}</p>
              <p>{result.volumeInfo.averageRating}</p>
              {/* <p>{result.volumeInfo.description}</p> */}
              <button className="button">Want to read</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
