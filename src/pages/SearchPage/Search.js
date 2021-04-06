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
    // console.log("res", res);
    setResults(res.data.items);
    // console.log("res data", res.data);

    setSearchTerm(searchTerm);
  }

  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <label> Search your books</label>
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
      <div>
        {results.map((result) => {
          return (
            <div className="searchResult" key={result.id}>
              <img
                alt={result.volumeInfo.title}
                src={result.volumeInfo.imageLinks.smallThumbnail}
              ></img>
              <h2>{result.volumeInfo.title}</h2>{" "}
              <p>{result.volumeInfo.authors}</p>
              <p>{result.volumeInfo.averageRating}</p>
              <p>{result.volumeInfo.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
