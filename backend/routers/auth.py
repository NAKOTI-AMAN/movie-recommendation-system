from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from schemas.schemas import *
from utils import helpers


auth = APIRouter(tags =['auth'])
@auth.post('/api/v1/login',status_code= status.HTTP_201_CREATED)
async def login(user: Login, db: Session = Depends(helpers.get_db)):
    db_user = await helpers.authenticate_user(user.email, user.password,db)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return await helpers.create_token(db_user)


@auth.post('/api/v1/users/me')
async def get_user(user: User = Depends(helpers.get_current_user)):
    return user
