import React from "react";
import "./book.css";

export default function Book(props) {
  return (
    <div className="book">
      <div>
        <div>
          <img src={props.imageURL} alt={props.title} />
        </div>
        <div className="column content-column">
          <h1 className="title">{props.title}</h1>
          <p>By: {props.author}</p>
          <p>
            {" "}
            Category:
            <a href={`/categories/${props.categoryId}`}>
              {props.categoryId}
            </a>{" "}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="column center">
          <Link to={`/articles/${props.articleId}`}>
            <button className="buttonStyle"> Read article</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
