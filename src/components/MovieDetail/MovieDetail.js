import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchDetailsUsingThunk,
  getSelectedDetails,
  clearSelection,
} from "../../features/movies/movieSlice";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedDetails);
  useEffect(() => {
    dispatch(fetchDetailsUsingThunk(imdbID));

    //now we need a cleanup function to clear the previous selection
    return () => {
      dispatch(clearSelection());
    };
  }, [imdbID]);
  return (
    <div className="movie-section">
      {/* Check if we have the data required  */}
      {Object.keys(data).length === 0 ? (
        <div className="loading-style">...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-details">
              <span>
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>

              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span>

              <span>
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>

              <span>
                Year <i className="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>

            <div className="movie-plot">{data.Plot}</div>

            <div className="movie-info">
              <div>
                <span>Director : </span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Actors : </span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genres : </span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages : </span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards : </span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>

          <div className="section-right">
            <img src={data.Poster} alt={data.Title}></img>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
