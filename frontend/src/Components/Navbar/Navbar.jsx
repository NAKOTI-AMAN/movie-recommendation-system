import { useState } from "react";
import "./Navbar.css";
export default function Navbar({ setRecommendations }) {
  const [genre, setGenre] = useState("");
  const recommendByGenre = async (selectedGenre) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/recommendations/genre/${selectedGenre}`,
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      setRecommendations(data);
    } else {
      console.log(data.detail);
    }
  };
  const genres = [
    "All Film",
    "Action",
    "Drama",
    "Romance",
    "Science Fiction",
    "Comedy",
    "Fantasy",
    "Thriller",
    "Horror",
  ];
  return (
    <div className="navbar">
      {genres.map((genre, index) => (
        <div
          key={index}
          onClick={() => {
            setGenre(genre);
            recommendByGenre(genre);
          }}
        >
          {genre}
        </div>
      ))}
    </div>
  );
}
