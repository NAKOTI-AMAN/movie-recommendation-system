import "./Header.css";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function Header({ setSearchResult, setRecommendations }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const recommendMovies = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/recommendations/${search}`,
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      setRecommendations(data);
    } else {

      setErrorMessage(data.detail);
    }
  };

  const searchMovie = async () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/search/${search}`,
      requestOptions
    );
    const data = await response.json();

    if (response.ok) {
      setSearchResult(data);
      recommendMovies();
    } else {
      setErrorMessage(data.detail);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="header-top">
        <div className="search">
          <div className="search-container">
            <div className="search-bar">
              <img
                src="/Assests/search-svgrepo-com.png"
                alt="search-icon"
                onClick={searchMovie}
              />
              <form>
                <input
                  type="text"
                  placeholder="Search.."
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setErrorMessage("");
                  }}
                />
              </form>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
          </div>
          <div className="mic">
            <img src="/Assests/mic-svgrepo-com.png" alt="" />
          </div>
        </div>
        <div className="authentication">
          {isLoggedIn ? (
            <div className="logout" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <>
              <Link to="/login">
                <div className="login">Login</div>
              </Link>
              <Link to="/signUp">
                <div className="sign-up">Sign-Up</div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="header-bottom">
        <Navbar setRecommendations={setRecommendations}/>
      </div>
    </header>
  );
}
