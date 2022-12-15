import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailBook } from "../api/BookApi";
import "./Detail.css";
import Rating from "../components/Rating";
import { ThreeDots } from "react-loader-spinner";

const Detail = () => {
  const [book, setBook] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getDetailBook(params.bookId).then((res) => {
      setLoading(false);
      setBook(res);
    });
  }, [params.bookId]);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <>
      {loading && (
        <div className="spinner">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      )}
      {!loading && (
        <div className="book-container">
          <div className="books-bar">
            <button className="close-search" onClick={goBack}>
              Close
            </button>
          </div>
          <div className="book-content">
            <div className="left-content">
              <img
                src={book.imageLinks ? book.imageLinks.thumbnail : ""}
                alt="Book cover"
              />
            </div>
            <div className="right-content mostly-customized-scrollbar">
              <div className="name">{book.title}</div>
              <div className="subname">
                {book.authors ? book.authors.toString() : "Unknown"}
                <p>Page count: {book.pageCount}</p>
                <p>Published date: {book.publishedDate}</p>
              </div>
              <Rating value={book.averageRating} />
              <div className="description">
                <p>{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
