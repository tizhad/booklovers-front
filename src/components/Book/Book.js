import "./Book.css";
import React from "react";
import { useState } from "react";
// import ShowMore from "react-show-more";
import {
  Button,
  ProgressBar,
  Card,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

export default function Book(props) {
  const [newProgress, setNewProgress] = useState();
  function addBook() {
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      categories: props.categories,
    });
  }

  function startBook() {
    props.onUpdateBook({
      googleID: props.googleID,
      title: props.title,
      categories: props.categories,
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
      categories: props.categories,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: "read",
      progress: 100,
    });
  }

  const updateProgress = () => {
    let progress = newProgress;
    let status = props.status;
    if (progress === 100) {
      status = "read";
    }
    props.onUpdateBook({
      googleID: props.googleID,
      categories: props.categories,
      title: props.title,
      imageURL: props.imageURL,
      authors: props.authors,
      description: props.description,
      status: status,
      progress: progress,
    });
    //reset form after submit
    setNewProgress();
  };

  return (
    <Card className="h-100 my-2 shadow p-3 bg-white rounded">
      <Card.Img variant="top" src={props.imageURL} className="card-img-top" />
      <Card.Body>
        <Card.Text>{props.title}</Card.Text>
        <Card.Text>By: {props.authors}</Card.Text>
        <Card.Text>
          Category:
          {props.categories === undefined || props.categories === null
            ? "Unknown"
            : props.categories}
        </Card.Text>

        {props.progress >= 0 && props.progress !== null ? (
          <ProgressBar now={props.progress} className="my-1"></ProgressBar>
        ) : (
          <p></p>
        )}
        <FormControl
          placeholder="new progress"
          aria-label="progress"
          type="number"
          onChange={(event) => setNewProgress(event.target.value)}
        />

        {props.status === "reading" && (
          <Button onClick={updateProgress} className="mx-1 my-2">
            update{" "}
          </Button>
        )}

        {props.status === undefined && (
          <Button onClick={addBook} className="mx-1 my-2">
            Want to read
          </Button>
        )}
        {props.status === "to-read" && (
          <Button onClick={startBook} className="mx-1 my-2">
            Start reading
          </Button>
        )}

        {props.status === "reading" && (
          <Button onClick={finishBook} className="mx-1 my-2">
            Finished!
          </Button>
        )}
      </Card.Body>
    </Card>
    // <ShowMore lines={3} more="Show more" less="Show less" anchorClass="">
    //   {props.description}
    // </ShowMore>
  );
}
