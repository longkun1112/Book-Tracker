import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, onClick }) => {
  const navigate = useNavigate();

  const handleCloseSearch = () => {
    navigate("/");
  };

  return (
    <div className="search-bar">
      <button className="close-search" onClick={handleCloseSearch}>
        Close
      </button>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default SearchBar;