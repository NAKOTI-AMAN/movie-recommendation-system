from fastapi import Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session
from schemas.schemas import *
from utils import helpers


user = APIRouter(tags =['user'])

@user.post('/api/v1/register', status_code= status.HTTP_201_CREATED)
async def create_user(user:User, db: Session = Depends(helpers.get_db)):
    print(user)
    db_user = await helpers.get_user_by_email(user.email,db)
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")
    return await helpers.create_new_user(user, db)
