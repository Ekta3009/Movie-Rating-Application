import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getAllMovies, getAllSeries } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import Slider from "react-slick";
import { settings } from "../../common/settings";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const series = useSelector(getAllSeries);

  //Check if movies object has Response field true if yes then no error occured

  let renderMovies = "",
    renderSeries = "";

  renderMovies =
    movies.Response === "True" ? (
      // When error does not occur then response object has a Search field that contains array of movies
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      //When error occurs the response data will have an Error field
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderSeries =
    series.Response === "True" ? (
      series.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="movies-error">
        <h3>{series.Error}</h3>
      </div>
    );

  //console.log(renderSeries);

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderMovies}</Slider>
        </div>
      </div>
      <div className="movie-list">
        <h2>Series</h2>
        <div className="movie-container">
          <Slider {...settings}>{renderSeries}</Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
