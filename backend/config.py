"""Flask configuration variables."""
# from os import environ, path
# from dotenv import load_dotenv

# basedir = path.abspath(path.dirname(__file__))
# load_dotenv(path.join(basedir, '.env'))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = "secreatjnasdvnkladsjbvkla"
    FLASK_APP = "wsgi.py"
    FLASK_ENV = "development"

    # Database
    SQLALCHEMY_DATABASE_URI = "sqlite:///universities.sqlite3"
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
