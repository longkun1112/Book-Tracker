import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Book from "../components/Book";
import { getAllBooks, updateBook } from "../api/BookApi";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Main = () => {
  const [booksList, setBooksList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const bookShelves = [
    {
      label: "Currently Reading",
      key: "currentlyReading",
    },
    {
      label: "Want to Read",
      key: "wantToRead",
    },
    {
      label: "Read",
      key: "read",
    },
  ];

  const handleOpenSearch = () => {
    navigate("/search");
  };

  useEffect(() => {
    setLoading(true);

    getAllBooks().then((res) => {
      setLoading(false);
      setBooksList(res);
    });
  }, []);

  const onMoveShelf = async (book, shelf) => {
    setLoading(true);
    
    await updateBook(book, shelf);

    const res = await getAllBooks();
    setBooksList(res);
    setLoading(false);
    toast.success("Moved successfully");
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
        <div className="list-books mostly-customized-scrollbar">
          <div className="title">
            <h1>My Reads</h1>
          </div>
          <div className="content">
            <div>
              {bookShelves.map((bookShelf) => (
                <div key={bookShelf.key} className="bookshelf">
                  <h2 className="bookshelf-title">{bookShelf.label}</h2>
                  <ol className="grid">
                    {booksList
                      ?.filter((book) => book.shelf === bookShelf.key)
                      .map((book) => (
                        <Book
                          key={book.id}
                          book={book}
                          onMoveShelf={onMoveShelf}
                        />
                      ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
          <div className="open-search">
            <button onClick={handleOpenSearch}>Add a book</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
