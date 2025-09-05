const isLocal = window.location.hostname === "localhost";

const config = {
  API_BASE_URL: isLocal
    ? "http://localhost:8080/api/movies" // local dev
    : "http://localhost:8080/watchlist-backend/api/movies" // deployed
};

export default config;