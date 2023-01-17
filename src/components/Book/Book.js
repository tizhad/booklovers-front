import "./Book.css";
import React from "react";
import { useState } from "react";
// import { Button, ProgressBar, Card, FormControl } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { ProgressBar } from "react-bootstrap";

export default function Book(props) {
  const [newProgress, setNewProgress] = useState(props.progress);

  //add book
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

  // Update a book

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

  // Finish a book
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

  //Update a book progress
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
  };

  return (
    <Card
      className="card-style"
      sx={{ maxWidth: 345, minWidth: 300 }}
      sm={{ minWidth: 250 }}
      md={{ minWidth: 250 }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={props.imageURL}
        title={props.imageURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" fontSize={12}>
          {props.title}
        </Typography>
        <Typography gutterBottom variant="h5" fontSize={12}>
          By: {props.authors}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" fontSize={12}>
          Category :
          {props.categories === undefined || props.categories === null
            ? " Unknown"
            : props.categories}
        </Typography>
        <CardActions>
          {props.status === undefined && (
            <Button variant="outlined" onClick={addBook}>
              Want to read
            </Button>
          )}
          {props.status === "to-read" && (
            <Button variant="outlined" onClick={startBook} size={"small"}>
              Start reading
            </Button>
          )}
        </CardActions>
        {props.progress >= 0 &&
          props.progress !== null &&
          props.progress !== 100 && <ProgressBar now={props.progress} />}
        {props.status === "reading" && (
          <TextField
            id="standard-basic"
            label="progress"
            variant="standard"
            type="number"
            size={"small"}
            onChange={(event) => setNewProgress(event.target.value)}
          />
        )}
        <CardActions>
          {props.status === "reading" && (
            <Button variant="outlined" onClick={updateProgress} size={"small"}>
              update
            </Button>
          )}
          {props.status === "reading" && (
            <Button variant="outlined" onClick={finishBook} size={"small"}>
              Finished!
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
