import time
import pandas as pd
import requests
from database.database import SessionLocal
from models import models
import os
from dotenv import load_dotenv

load_dotenv()

def load_data():
    df = pd.read_csv('movie_recommendation_dataset.csv')
    db = SessionLocal()

    base_url = 'https://api.themoviedb.org/3/movie/'

    API_KEY = os.environ.get('API_KEY')

    try:
        for _, row in df.iterrows():
            movie_id = row['movie_id']

            url = f'{base_url}{movie_id}?api_key={API_KEY}'

            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                poster_path = data.get('poster_path')

                movie = models.Movie(
                    movie_id=movie_id,
                    title=row['title'],
                    overview=row['overview'],
                    tags=row['tags'],
                    cast=row['cast'],
                    crew=row['crew'],
                    genres=row['genres'],
                    poster_path=poster_path
                )
                db.add(movie)
                db.commit()

                print(f"Loaded data for movie: {row['title']}")

                time.sleep(1 / 50)

            else:
                print(f"Failed to fetch data for movie ID: {movie_id}")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()

    finally:
        db.close()

if __name__ == "__main__":
    load_data()
