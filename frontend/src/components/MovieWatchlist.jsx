import React, { useEffect, useState } from "react";
import "./MovieWatchlist.css";

const MovieWatchlist = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: "",
    releaseYear: "",
    language: "",
    rating: "",
    type: "",
    status: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const addMovie = () => {
    fetch("http://localhost:8080/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, data]);
        setNewMovie({ name: "", releaseYear: "", language: "", rating: "", type: "", status: "" });
      });
  };

  const deleteMovie = (id) => {
    fetch(`http://localhost:8080/api/movies/${id}`, { method: "DELETE" })
      .then(() => setMovies(movies.filter((m) => m.id !== id)));
  };

  return (
    <div className="movie-container">
      <h1>🎬 Movie Watchlist</h1>
      <div className="form-container">
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={newMovie.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          placeholder="Release Year"
          value={newMovie.releaseYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={newMovie.language}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newMovie.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status (Watched/To Watch)"
          value={newMovie.status}
          onChange={handleChange}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <table className="movie-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Year</th>
            <th>Language</th>
            <th>Rating</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.name}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.language}</td>
              <td>{movie.rating}</td>
              <td>{movie.type}</td>
              <td>{movie.status}</td>
              <td>
                <button onClick={() => deleteMovie(movie.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieWatchlist;
