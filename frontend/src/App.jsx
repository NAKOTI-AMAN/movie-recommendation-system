import React, { useState } from "react";
import Header from "./Components/Header/Header";
import HeroSection from "./Components/HeroSection/HeroSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import MovieDetail from "./Components/MovieDetail/MovieDetail";


function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
      <Header setSearchResult={setSearchResult} setRecommendations={setRecommendations}/>
                <HeroSection searchResult={searchResult} recommendations={recommendations}/>
              </>
            }
          ></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/movie/:title" element={<MovieDetail setRecommendations={setRecommendations} recommendations={recommendations}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
