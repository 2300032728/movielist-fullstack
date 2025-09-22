import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieWatchlist.css";
import config from "./config.js";

const MovieWatchlist = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({
    id: "",
    name: "",
    releaseYear: "",
    language: "",
    rating: "",
    type: "",
    status: ""
  });
  const [message, setMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const baseUrl = `${config.url}/api/movies`;

  useEffect(() => {
    fetchAllMovies();
  }, []);

  // Fetch all movies
  const fetchAllMovies = async () => {
    try {
      const res = await axios.get(baseUrl);
      setMovies(res.data);
    } catch (error) {
      setMessage("❌ Failed to fetch movies.");
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!movie.name.trim() || !movie.releaseYear.trim()) {
      setMessage("⚠ Please fill all required fields.");
      return false;
    }
    return true;
  };

  // Add Movie
  const addMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(baseUrl, movie);
      setMessage("✅ Movie added successfully.");
      fetchAllMovies();
      resetForm();
    } catch (error) {
      setMessage("❌ Error adding movie.");
    }
  };

  // Update Movie
  const updateMovie = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/${editId}`, movie);
      setMessage("✅ Movie updated successfully.");
      fetchAllMovies();
      resetForm();
    } catch (error) {
      setMessage("❌ Error updating movie.");
    }
  };

  // Delete Movie
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setMessage("🗑 Movie deleted.");
      fetchAllMovies();
    } catch (error) {
      setMessage("❌ Error deleting movie.");
    }
  };

  // Edit Movie (fills form)
  const handleEdit = (m) => {
    setMovie({
      id: m.id,
      name: m.name,
      releaseYear: m.releaseYear,
      language: m.language,
      rating: m.rating,
      type: m.type,
      status: m.status
    });
    setEditMode(true);
    setEditId(m.id);
    setMessage(`✏ Editing movie with ID ${m.id}`);
  };

  const resetForm = () => {
    setMovie({
      id: "",
      name: "",
      releaseYear: "",
      language: "",
      rating: "",
      type: "",
      status: ""
    });
    setEditMode(false);
    setEditId(null);
  };

  return (
    <div className="movie-container">
      {message && (
        <div
          className={`message-banner ${
            message.includes("❌") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <h1>🎬 Movie Watchlist</h1>

      {/* Form */}
      <div className="form-grid">
        <input
          type="number"
          name="id"
          placeholder="Movie ID"
          value={movie.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={movie.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="releaseYear"
          placeholder="Release Year"
          value={movie.releaseYear}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={movie.language}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={movie.rating}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={movie.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status (Watched/To Watch)"
          value={movie.status}
          onChange={handleChange}
        />
      </div>

      <div className="btn-group">
        {!editMode ? (
          <button className="btn-blue" onClick={addMovie}>
            ➕ Add Movie
          </button>
        ) : (
          <>
            <button className="btn-green" onClick={updateMovie}>
              🔄 Update Movie
            </button>
            <button className="btn-gray" onClick={resetForm}>
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Movie Table */}
      <h3>All Movies</h3>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="movie-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Release Year</th>
                <th>Language</th>
                <th>Rating</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.releaseYear}</td>
                  <td>{m.language}</td>
                  <td>{m.rating}</td>
                  <td>{m.type}</td>
                  <td>{m.status}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-green" onClick={() => handleEdit(m)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-red" onClick={() => deleteMovie(m.id)}>
                        ❌ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MovieWatchlist;
