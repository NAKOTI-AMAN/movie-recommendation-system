# Movie Recommendation System

This is a movie recommendation system implemented with FastAPI for the backend and React with Vite for the frontend.

## Overview

This project aims to provide users with personalized movie recommendations based on their preferences. It utilizes FastAPI for the backend to handle data retrieval, user authentication, and recommendation generation. The frontend, built with React and Vite, provides an intuitive interface for users to search for movies, explore recommendations, and discover similar movies.

## Features

- **Data Acquisition:** Utilizes the TMDB (The Movie Database) dataset to fetch movie information such as title, genre, and synopsis via a custom API. Data is stored in a MySQL database for efficient access and manipulation.
  
- **User Management:** Implements secure user authentication and authorization. Users can register, login, and logout securely.
  
- **Movie Recommendations:** Developed a recommendation engine using content-based filtering algorithms with scikit-learn. Top N recommended movies are displayed based on the chosen algorithm.
  
- **Search Functionality:** Implements a search bar allowing users to search for movies by title or genres. Database queries or the custom API are used for search functionality, and relevant movie information is displayed in the search results.
  
- **Similar Movie Exploration:** Provides an option to explore similar movies within each movie listing. The system utilizes movie data (e.g., genres) to find similar movies using the recommendation algorithm or filtering techniques. A list of similar movies is displayed for further exploration.

## Installation and Setup

### Backend (FastAPI)

1. Clone the repository.
2. Navigate to the `backend` directory.
3. Install dependencies using `pip install -r requirements.txt`.
4. Set up environment variables (e.g., API endpoint).
5. Run the FastAPI server using `uvicorn main:app --reload`.

### Frontend (React with Vite)

1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install` or `yarn install`.
3. Set up environment variables (e.g., API endpoint).
4. Run the development server using `npm run dev` or `yarn dev`.

## Usage

1. Open the web application in your browser.
2. Register or login to your account.
3. Search for movies using the search bar or explore recommended movies.
4. Mark movies as "liked" or provide ratings to improve recommendations.
5. Explore similar movies based on your preferences.

## Technologies Used

- **Backend:** FastAPI, Python, MySQL
- **Frontend:** React, Vite
- **Machine Learning:** scikit-learn
- **Data Source:** TMDB (The Movie Database) dataset

