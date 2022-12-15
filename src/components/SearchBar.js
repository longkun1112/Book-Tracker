import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ value, onChange }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="search-bar">
      <button className="close-search" onClick={goBack}>
        Close
      </button>
      <div className="search-wrapper">
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