import "./HeroSection.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recommendation from "../Recommendation/Recommendation";

export default function HeroSection({ searchResult, recommendations }) {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState("");
  const [cast, setCast] = useState("");
  const [crew, setCrew] = useState("");
  const [overview, setOverview] = useState("");
  const [imagePath, setImagePath] = useState("");

  const convertToCommaSeparated = (str) => {
    return str
      .replace(/[\[\]']+/g, "")
      .split(",")
      .map((item) => item.trim())
      .join(", ");
  };

  useEffect(() => {
    if (searchResult) {
      setTitle(searchResult.title);
      setOverview(searchResult.overview);
      setCast(convertToCommaSeparated(searchResult.cast));
      setCrew(convertToCommaSeparated(searchResult.crew));
      setGenres(convertToCommaSeparated(searchResult.genres));
      setImagePath(searchResult.poster_path);
    } else {
      const searchMovie = async () => {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/search/Avatar`,
          requestOptions
        );
        const data = await response.json();
        if (response.ok) {
          setTitle(data.title);
          setOverview(data.overview);
          setCast(convertToCommaSeparated(data.cast));
          setCrew(convertToCommaSeparated(data.crew));
          setGenres(convertToCommaSeparated(data.genres));
          setImagePath(data.poster_path);
        }
      };
      searchMovie();
    }
  }, [searchResult]);

  return (
    <div className="hero-section">
      <div className="hero-section-top">
        <div
          className="trending-movie"
          style={{ backgroundImage: `url(${imagePath})` }}
        >
          <div className="trending-movie-description">
            <div className="description-top">
              <div className="movie-title">{title}</div>
              <div className="movie-genres">{genres}</div>
              <div className="movie-overview">Overview: {overview}</div>
              <div className="movie-director">Director: {crew}</div>
              <div className="movie-cast">Top billed cast: {cast}</div>
            </div>
            <div className="description-bottom">
              <div className="watch">
                <Link to={`/movie/${title}`}>
                  <button>Watch Now</button>
                </Link>
                <button>Watch Later</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-section-bottom">
        <div className="recommendations-top">Recommedations</div>
        <Recommendation recommendations={recommendations} />
      </div>
    </div>
  );
}
