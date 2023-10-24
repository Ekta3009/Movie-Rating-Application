import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getAllMovies,
  getAllSeries,
  getMoviesLoadingStatus,
  getSeriesLoadingStatus,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import Slider from "react-slick";
import { settings, errorSettings } from "../../common/settings";

const MovieListing = () => {
  const loadingMovies = useSelector(getMoviesLoadingStatus);
  const loadingSeries = useSelector(getSeriesLoadingStatus);
  const movies = useSelector(getAllMovies);
  const series = useSelector(getAllSeries);

  let renderMovies = "",
    renderSeries = "";
  //Check if movie with given search text exists or not
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>Sorry! the movie you are looking for was not found</h3>
      </div>
    );

  //Check if series with given search text exists or not
  renderSeries =
    series.Response === "True" ? (
      series.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="movies-error">
        <h3>Sorry! the series you are looking for was not found</h3>
      </div>
    );

  //Wait till both Movies and Series have completely been fetched
  return loadingMovies === "True" || loadingSeries === "True" ? (
    <div className="loading-style">...Loading</div>
  ) : (
    <>
      <div className="movie-wrapper">
        <div className="movie-list">
          <h2>Movies</h2>
          <div className="movie-container">
            {/* We want to render only one full-width card if no movies are found so settings change*/}
            {movies.Response === "True" ? (
              <Slider {...settings}>{renderMovies}</Slider>
            ) : (
              <Slider {...errorSettings}>{renderMovies}</Slider>
            )}
          </div>
        </div>
        <div className="movie-list">
          <h2>Series</h2>
          <div className="movie-container">
            {/* We want to render only one full-width card if no movies are found so settings change*/}
            {series.Response === "True" ? (
              <Slider {...settings}>{renderSeries}</Slider>
            ) : (
              <Slider {...errorSettings}>{renderSeries}</Slider>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieListing;
