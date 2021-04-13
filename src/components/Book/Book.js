import "./Book.css";
import React from "react";

export default function Book(props) {
  function addBook() {
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
    });
  }

  function startBook() {
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: "reading",
      progress: 0,
    });
  }

  function finishBook() {
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: "read",
      progress: 100,
    });
  }

  function updateProgress(progress) {
    let status = "reading";
    if (progress === 100) {
      status = "read";
    }
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: status,
      progress: progress,
    });
  }

  return (
    <div className="wrapper">
      <div className="row">
        <div className="column image-column">
          <img className="imageStyle" src={props.imageURL} alt={props.title} />
        </div>
        <div className="column content-column">
          <h2 className="title">{props.title}</h2>
          <p>By: {props.authors}</p>
          {/* <p>{props.description}</p> */}
          <p>{props.rate !== null ? true : false}</p>
          <p>{props.progress !== null ? true : false}</p>
          <p>{props.status !== null ? true : false}</p>
          {props.status === undefined && (
            <button onClick={addBook}>Want to read</button>
          )}

          {props.status === "to-read" && (
            <button onClick={startBook}>Start reading</button>
          )}

          {props.status === "reading" && (
            <button onClick={finishBook}>Done</button>
          )}

          {props.status === "read" && (
            <p>Congrats! You've already read this book.</p>
          )}
        </div>
      </div>
    </div>
  );
}
