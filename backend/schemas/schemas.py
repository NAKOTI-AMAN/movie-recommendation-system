from pydantic import BaseModel, EmailStr, field_validator,Field, ConfigDict
from typing import Optional
import re

class User(BaseModel):
    id: Optional[int]= Field(default=None, exclude=True)
    username: str = Field(..., min_length=4, max_length=30)
    email:EmailStr
    password: str
    
    model_config = ConfigDict(from_attributes=True)
    @field_validator("username")
    def validate_name(cls, v):
        if not re.match(r"^[a-zA-Z0-9]+$", v.strip()):
            raise ValueError(status_code=200,detail="Name can only contain alphabets and digits without any space.")
        return v
    @field_validator("password")
    def validate_password_strength(cls, v):
        if not re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{'\":;?/><,.\\-]).{8,}$", v):
            raise ValueError(status_code=200,detail='Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.')
        return v
    
    
class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    model_config = ConfigDict(from_attributes=True)
    
    
class Login(BaseModel):
    email: EmailStr
    password: str

class MovieResponse(BaseModel):
    id: int
    movie_id: int
    title: str
    overview: str
    tags: str
    cast: str
    crew: str
    genres: str
    poster_path: str