from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

from dotenv import load_dotenv

load_dotenv()

USERNAME=os.environ.get('DB_USERNAME')
HOSTNAME=os.environ.get('DB_HOSTNAME')
PASSWORD=os.environ.get('DB_PASSWORD')
DB_NAME=os.environ.get('DB_NAME')


URL_DATABASE = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}/{DB_NAME}'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base = declarative_base()