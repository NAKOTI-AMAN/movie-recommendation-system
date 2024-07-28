from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from schemas.schemas import *
from utils import helpers
from models import models

search = APIRouter(tags=['search'])
@search.get("/api/v1/search/{title}", response_model=MovieResponse)
async def get_movie_details(title: str, db: Session = Depends(helpers.get_db)):
    movie = db.query(models.Movie).filter(models.Movie.title == title).first()
    if not movie:
        movie = db.query(models.Movie).filter(models.Movie.title.ilike(f"%{title}%")).first()
        if not movie:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movie not found")
    movie.poster_path = "https://image.tmdb.org/t/p/w500/"+movie.poster_path
    return movie
