import React, { useState, useEffect } from "react";
import { getAllBooks, searchBooks, updateBook } from "../api/BookApi";
import Book from "../components/Book";
import SearchBar from "../components/SearchBar";
import "./Search.css";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const Search = () => {
  const [booksList, setBooksList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchSubmit = async (query) => {
    setLoading(true);
    setError("");
    const res = await searchBooks(query);

    if (res.error) {
      setLoading(false);
      setError("Oops! Search not found");
      setSearchResults(res.items);
    } else {
      setLoading(false);
      setSearchResults(res);
    }
  };

  const findCurrentShelf = (bookId) => {
    const book = booksList.find((book) => book.id === bookId);

    if (book) {
      return book.shelf;
    }

    return null;
  };

  const handleInputSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearResults = () => setSearchResults([]);

  const onMoveShelf = async (book, shelf) => {
    try {
      await updateBook(book, shelf);

      toast.success("Moved successfully");
    } catch (e) {
      console.log(e);
    }
  };

  const renderBooks = searchResults?.map((book) => {
    return (
      <Book
        key={book.id}
        book={book}
        onMoveShelf={onMoveShelf}
        currentShelf={findCurrentShelf(book.id)}
      />
    );
  });

  useEffect(() => {
    if (query !== "") {
      handleSearchSubmit(query);
    } else {
      clearResults();
    }
  }, [query]);

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooksList(res);
    });
  }, []);

  return (
    <div className="search-books">
      <SearchBar value={query} onChange={handleInputSearch} />
      <div className="search-results">
        <div className="grid">
          {loading && 
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
          </div>}
          {!loading && searchResults.length !== 0 && renderBooks}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Search;
