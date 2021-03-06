from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    """Construct the core application."""
    app = Flask(__name__, static_folder='../../frontend/build', static_url_path='/mainpage',instance_relative_config=False)
    app.config.from_object("config.Config")
    
    db.init_app(app)
    ma.init_app(app)
    CORS(app)

    with app.app_context():
        from . import routes  # Import routes

        db.create_all()  # Create database tables for our data models

        return app
