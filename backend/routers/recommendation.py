from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from schemas.schemas import *
from utils import helpers
from utils.recommendations import recommend
from models import models
import random

recommendation=APIRouter(tags =['recommendation'])
@recommendation.get("/api/v1/recommendations/{movie}")
async def get_recommendations(movie: str ):
    recommendations,posters = recommend(movie)
    return {"movie": movie, "recommendations": recommendations, "posters": posters}


@recommendation.get("/api/v1/recommendations/genre/{genre}")
async def get_recommendation_by_genre(genre: str,db: Session = Depends(helpers.get_db)):
    if genre == "All Film":
        genre_movies = db.query(models.Movie).all()
    else:
        genre_movies = db.query(models.Movie).filter(models.Movie.genres.like(f"%{genre}%")).all()

    if not genre_movies:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"No movies found with the genre {genre}")

    random_movies = random.sample(genre_movies, min(len(genre_movies), 12))

    recommendations = [{"title": movie.title, "poster_path": f"https://image.tmdb.org/t/p/w500/{movie.poster_path}"} for movie in random_movies]

    return {
        "genre": genre,
        "recommendations": [movie["title"] for movie in recommendations],
        "posters": [movie["poster_path"] for movie in recommendations]
    }
