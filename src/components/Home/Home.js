import React from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchMoviesUsingThunk,
  fetchSeriesUsingThunk,
} from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();

  //useEffect used to refresh required components on every render
  useEffect(() => {
    dispatch(fetchMoviesUsingThunk());
    dispatch(fetchSeriesUsingThunk());
  }, []);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
