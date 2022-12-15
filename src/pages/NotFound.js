import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="container">
      <h2>Oops..! 404 Page Not Found</h2>
      <h1>404</h1>
      <p>Looks like you came to wrong page on our server</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
