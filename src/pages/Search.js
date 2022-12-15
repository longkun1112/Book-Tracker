import React, { useState, useEffect } from "react";
import { getAllBooks, searchBooks, updateBook } from "../api/BookApi";
import Book from "../components/Book";
import SearchBar from "../components/SearchBar";
import "./Search.css";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Search = () => {
  const [list, setList] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = async (keyword) => {
    setLoading(true);
    setError("");
    const res = await searchBooks(keyword);

    if (res.error) {
      setLoading(false);
      setError("Search not found");
      setSearchRes(res.items);
    } else {
      setLoading(false);
      setSearchRes(res);
    }
  };

  const findCurrentShelf = (bookId) => {
    const book = list.find((book) => book.id === bookId);

    if (book) {
      return book.shelf;
    }

    return null;
  };

  const handleInputSearch = (e) => {
    setKeyword(e.target.value);
  };

  const clearRes = () => setSearchRes([]);

  const moveShelf = async (book, shelf) => {
    try {
      await updateBook(book, shelf);

      toast.success("Moved successfully");
    } catch (e) {
      console.log(e);
      toast.error("Moved fail");
    }
  };

  const renderBooks = searchRes?.map((book) => {
    return (
      <Book
        key={book.id}
        book={book}
        moveShelf={moveShelf}
        currentShelf={findCurrentShelf(book.id)}
      />
    );
  });

  useEffect(() => {
    if (keyword !== "") {
      handleSearchSubmit(keyword);
    } else {
      clearRes();
    }
  }, [keyword]);

  useEffect(() => {
    getAllBooks().then((res) => {
      setList(res);
    });
  }, []);

  return (
    <div className="search-books">
      <SearchBar value={keyword} onChange={handleInputSearch} />
      <div className="search-results">
        <div className="grid">
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
          {!loading && searchRes.length !== 0 && renderBooks}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
