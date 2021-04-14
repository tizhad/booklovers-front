import "./Book.css";
import React from "react";
import { useState } from "react";

export default function Book(props) {
  const [newProgress, setNewProgress] = useState(props.progress);
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

  const onSubmitForm = (event) => {
    event.preventDefault();
  };
  const updateProgress = () => {
    let progress = newProgress;
    let status = props.status;
    if (progress == 100) {
      status = "read";
    }
    console.log("status", status);
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: status,
      progress: progress,
    });
  };

  return (
    <div className="book">
      <div className="book-row">
        <div className="book-column">
          <img className="book-image" src={props.imageURL} alt={props.title} />

          {props.status === undefined && (
            <button className="book-button" onClick={addBook}>
              Want to read
            </button>
          )}

          {props.status === "to-read" && (
            <button className="book-button" onClick={startBook}>
              Start reading
            </button>
          )}
          {props.status === "reading" && (
            <div>
              <form onSubmit={onSubmitForm}>
                <input
                  className="input"
                  type="number"
                  name="progress"
                  placeholder="e.g. 20"
                  onChange={(event) => setNewProgress(event.target.value)}
                />
                <button className="update-button" onClick={updateProgress}>
                  update
                </button>
              </form>
            </div>
          )}
          {props.status === "reading" && (
            <button className="book-button" onClick={finishBook}>
              Finished!
            </button>
          )}
        </div>
        <div className="book-column">
          <h4>{props.title}</h4>
          <p>By: {props.authors}</p>
          {props.progress >= 0 && props.progress !== null ? (
            <progress value={props.progress} max="100"></progress>
          ) : (
            <p></p>
          )}

          {props.description !== undefined && (
            <p className="">{props.description.substring(0, 200)}</p>
          )}

          {props.rate !== null ? (
            <p className="">Rate: {props.rate}</p>
          ) : (
            <p className=""></p>
          )}
        </div>
      </div>
    </div>
  );
}
