from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, user, recommendation, search
from schemas.schemas import *


app= FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)



app.include_router(auth)
app.include_router(user)
app.include_router(recommendation)
app.include_router(search)
