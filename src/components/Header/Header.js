import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import user from "../../images/user.png";
import "./Header.scss";
import {
  fetchMoviesUsingThunk,
  fetchSeriesUsingThunk,
} from "../../features/movies/movieSlice";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchMoviesUsingThunk(searchText));
    dispatch(fetchSeriesUsingThunk(searchText));

    return () => {
      setSearchText("");
    };
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Movies and Shows"
            className="form-text"
            required
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
