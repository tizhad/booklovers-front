import React from "react";
import axios from "axios";
import { useState } from "react";

const SearchPage = (props) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getResults() {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    console.log("res", res);
    setResults(res.data.items);
    console.log("res data", res.data);

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
          return <h2>{result.volumeInfo.title}</h2>;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
