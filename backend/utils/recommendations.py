from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from database.database import SessionLocal
from sqlalchemy.orm import sessionmaker
from models import models
from fuzzywuzzy import process

session = SessionLocal()

movies = session.query(models.Movie).all()

movies_data = {
    'title': [movie.title for movie in movies],
    'tags': [movie.tags for movie in movies],
    'poster_path': [movie.poster_path for movie in movies]
}
movies_df = pd.DataFrame(movies_data)

cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(movies_df['tags']).toarray()


similarity = cosine_similarity(vectors)

def recommend(movie):
    movie_index = movies_df[movies_df['title'] == movie].index
    if len(movie_index) == 0:
        closest_match = process.extractOne(movie, movies_df['title'])
        if closest_match and closest_match[1] > 70:
            movie_index = movies_df[movies_df['title'] == closest_match[0]].index
        else:
            return ["Movie not found in the database"], ["No movie posters found"]
    movie_index = movie_index[0]
    distances = similarity[movie_index]
    recommended_movies = []
    recommended_movies_poster = []
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:13]
    if movies_list:
        for i in movies_list:
            recommended_movies.append(movies_df.iloc[i[0]].title)
            recommended_movies_poster.append("https://image.tmdb.org/t/p/w500/"+movies_df.iloc[i[0]].poster_path)
    return recommended_movies, recommended_movies_poster
