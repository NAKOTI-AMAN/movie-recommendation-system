import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./MovieDetail.css";
import Recommendation from "../Recommendation/Recommendation";
function MovieDetails({setRecommendations, recommendations}) {
  const navigate=useNavigate()
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/search/${title}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchSimlarMovie = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/recommendations/${title}`
        );
        const similarData = await response.json();
        setRecommendations(similarData)
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    
    fetchMovieDetails();
    fetchSimlarMovie();
  }, [title]);

  const convertToCommaSeparated = (str) => {
    return str
      .replace(/[\[\]']+/g, '')
      .split(',')
      .map(item => item.trim())
      .join(', ');
  };
  if (!movie) return <div>Loading...</div>;
  return (
    <>
      <div className="explore-movie-top" style={{
          '--background-image': `url(${movie.poster_path})`
        }}>
        <div className="go-home" onClick={()=>navigate('/')} >
          <img
            src="../../../public/Assests/back-arrow-direction-down-right-left-up-2-svgrepo-com.png"
            alt=""
          />
        </div>
        <div className="explore-movie-top-left"><img src={movie.poster_path} alt="" /></div>
        <div className="explore-movie-top-right">
          <h2>{movie.title}</h2>
          <p>{convertToCommaSeparated(movie.genres)}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Director</h4>
          <p>{convertToCommaSeparated(movie.crew)}</p>
          <h4>Top Billed Casts</h4>
          <p>{convertToCommaSeparated(movie.cast)}</p>
        </div>
      </div>
      <div className="explore-movie-bottom">
        <div className="similar-movies-recommendation">
        <div className="recommendations-top">Similar Movies</div>
          <Recommendation recommendations={recommendations}/>
        </div>
      </div>
    </>
  );
}
export default MovieDetails;