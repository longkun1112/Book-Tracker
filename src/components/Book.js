import React from "react";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import "./Book.css";

const Book = ({ book, currentShelf, moveShelf }) => {
  const navigate = useNavigate();

  const shelfList = [
    { label: "Current reading", value: "currentlyReading" },
    { label: "Want to read", value: "wantToRead" },
    { label: "Read", value: "read" },
    { label: "None", value: "none" },
  ];

  const handleClickBook = (bookId) => {
    navigate(`/${bookId}`);
  };

  return (
    <div className="book">
      <div className="top">
        <div
          className="cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks ? book.imageLinks.smallThumbnail : ""
            })`,
          }}
          onClick={() => handleClickBook(book.id)}
        />
        <div className="shelf-changer">
          <select
            onChange={(e) => moveShelf(book, e.target.value)}
            defaultValue={
              book.shelf ? book.shelf : currentShelf ? currentShelf : "none"
            }
          >
            <option value="move" disabled>
              Move to
            </option>
            {shelfList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Rating value={book.averageRating} />
      <div className="book-title">{book.title}</div>
      <div className="authors">
        {book.authors ? book.authors.toString() : "Unknown"}
      </div>
    </div>
  )
}

export default Book