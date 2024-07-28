from sqlalchemy import Boolean,Column,String,Integer,ARRAY,Text
from database.database import Base
from passlib.hash import bcrypt

class User(Base):
    __tablename__ = 'users'
    
    id= Column(Integer, primary_key=True,index=True)
    username = Column(String(50), unique=True)
    email = Column(String(80))
    password = Column(String(100))
    
    def verify_password(self,password: str):
        return bcrypt.verify(password, self.password)
    
class Movie(Base):
    __tablename__ = 'movies'

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(Integer)
    title = Column(String(255))
    overview = Column(Text)
    tags = Column(Text)
    cast = Column(Text)
    crew = Column(Text)
    genres = Column(Text)
    poster_path = Column(String(255))
