import os
import jwt
from database.database import SessionLocal
from fastapi import Depends, HTTPException, Request, status
from models import models
from passlib.hash import bcrypt
from schemas.schemas import *
from sqlalchemy.orm import Session
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY=os.environ.get('JWT_SECRET_KEY')

def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_user_by_email(email:str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()

async def create_new_user(user: User, db: Session):
    user_obj = models.User(username=user.username, email=user.email, password=bcrypt.hash(user.password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return {"detail": "User created successfully"}

async def authenticate_user(email:str, password:str, db: Session):
    user = await get_user_by_email(email=email,db=db)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user

async def create_token(user: models.User):
    user_obj = UserResponse.model_validate(user)
    token = jwt.encode(user_obj.model_dump(),JWT_SECRET_KEY)
    return dict(access_token=token,token_type="bearer")

async def get_current_user(request: Request, db: Session = Depends(get_db)):
    authorization:str = request.headers.get('Authorization')
    if not authorization:
        raise HTTPException(status_code= status.HTTP_401_UNAUTHORIZED, detail="Invalid Email or Password")
    
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        user = db.query(models.User).get(payload['id'])
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Email or Password")
    
    return User.model_validate(user)