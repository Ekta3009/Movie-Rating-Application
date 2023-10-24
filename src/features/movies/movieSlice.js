import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchMoviesUsingThunk = createAsyncThunk(
  "movies/fetchMoviesUsingThunk",
  async (movieText) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchSeriesUsingThunk = createAsyncThunk(
  "movies/fetchSeriesUsingThunk",
  async (seriesText) => {
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchDetailsUsingThunk = createAsyncThunk(
  "movies/fetchDetailsUsingThunk",
  async (id) => {
    const response = await MovieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  series: {},
  selected: {},
  loadingMovies: "False",
  loadingSeries: "False",
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSelection: (state) => {
      state.selected = {};
    },
  },
  extraReducers: {
    [fetchMoviesUsingThunk.pending]: (state) => {
      console.log("Fetch Movie Request Pending...");
      return { ...state, loadingMovies: "True" };
    },
    [fetchSeriesUsingThunk.pending]: (state) => {
      console.log("Fetch Series Request Pending...");
      return { ...state, loadingSeries: "True" };
    },
    [fetchMoviesUsingThunk.fulfilled]: (state, { payload }) => {
      console.log("Fetch Movie Request Successful...");
      return { ...state, movies: payload, loadingMovies: "False" };
    },
    [fetchSeriesUsingThunk.fulfilled]: (state, { payload }) => {
      console.log("Fetch Series Request Successful...");
      return { ...state, series: payload, loadingSeries: "False" };
    },
    [fetchDetailsUsingThunk.fulfilled]: (state, { payload }) => {
      console.log("Details fetched Successfully...");
      return { ...state, selected: payload };
    },
  },
});

//Export the action creator that are automatically created with same name as reducers
export const { clearSelection } = movieSlice.actions;

//Creating a function to get all the movies
//getting moviesSlice named "movies" from state and returning its 'movies' parameter
export const getAllMovies = (state) => state.movies.movies;

export const getAllSeries = (state) => state.movies.series;

export const getSelectedDetails = (state) => state.movies.selected;

export const getMoviesLoadingStatus = (state) => state.movies.loadingMovies;

export const getSeriesLoadingStatus = (state) => state.movies.loadingSeries;

//Export the reducers
export default movieSlice.reducer;
