import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Recommendation.css";

export default function Recommendation({ recommendations }) {
  const [fetchedRecommendations, setFetchedRecommendations] = useState([]);
  const [fetchedPosters, setFetchedPosters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const recommendMovies = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/recommendations/Avatar",
          requestOptions
        );
        const data = await response.json();
        if (response.ok) {
          setFetchedRecommendations(data.recommendations);
          setFetchedPosters(data.posters);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
    recommendMovies();
  }, []);

  const handleCardClick = (title) => {
    navigate(`/movie/${title}`)
  }

  const renderRecommendations = () => {
    const recs = recommendations ? recommendations.recommendations : fetchedRecommendations;
    const posters = recommendations ? recommendations.posters : fetchedPosters;

    if (!recs || recs.length === 0) {
      const emptyCards = Array.from({ length: 12 }, (_, index) => (
        <div key={index} className="recommendation-card" onClick={()=> handleCardClick(fetchedRecommendations[index])}>
          <img
            src={posters[index] || ""}
            alt={fetchedRecommendations[index] || "Demo"}
            className="recommendation-card-poster"
          />
          <div className="recommendation-card-title">
            {fetchedRecommendations[index] || "Demo"}
          </div>
        </div>
      ));

      return (
        <div className="recommendations-below">{emptyCards}</div>
      );
    }

    return (
      <div className="recommendations-below">
        {recs.map((recommendation, index) => (
          <div key={index} className="recommendation-card" onClick={() => handleCardClick(recommendation)}>
            <img
              src={posters[index]}
              alt={recommendation}
              className="recommendation-card-poster"
            />
            <div className="recommendation-card-title">{recommendation}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="recommendations">
      
      {renderRecommendations()}
    </div>
  );
}
