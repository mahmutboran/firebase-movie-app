import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContext";
import { toastWarnNotify } from "../helpers/ToastNotify";


const API_KEY = process.env.REACT_APP_TMDB_KEY;
//const API_KEY = "3ae99fcb249d40519289af2feb3212b9";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {

  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState()

  const { currentUser } = useContext(AuthContext)

  const getMovies = (API) => {
    axios.get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getMovies(FEATURED_API)

  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm)
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie")
      //alert("Please log in to search a movie")
    } else (
      toastWarnNotify("Please enter a text")
      //alert("Please enter a text")
    )


  }

  return (


    <>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search-input"
          placeholder="Search a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="d-flex flex-wrap justify-content-center">
        {
          movies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))
        }

      </div>
    </>
  )
};

export default Main;
