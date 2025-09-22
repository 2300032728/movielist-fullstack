package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    // Get all movies
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    // Add new movie
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    // Update movie
    public Movie updateMovie(Long id, Movie updatedMovie) {
        return movieRepository.findById(id).map(movie -> {
            movie.setName(updatedMovie.getName());
            movie.setReleaseYear(updatedMovie.getReleaseYear());
            movie.setLanguage(updatedMovie.getLanguage());
            movie.setRating(updatedMovie.getRating());
            movie.setType(updatedMovie.getType());
            movie.setStatus(updatedMovie.getStatus());
            return movieRepository.save(movie);
        }).orElseThrow(() -> new RuntimeException("Movie not found with id " + id));
    }

    // Delete movie
    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new RuntimeException("Movie not found with id " + id);
        }
        movieRepository.deleteById(id);
    }
}
