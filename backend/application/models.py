  
"""Data models."""
from . import db


class University(db.Model):
    """Data model for user accounts."""
    
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255), index=False, unique=False, nullable=False)
    alpha_two_code = db.Column(db.String(3), index=False, unique=False, nullable=False)
    domain = db.Column(db.String(70), index=False, unique=False, nullable=False)
    web_page = db.Column(db.String(70), index=False, unique=False, nullable=False)
    country = db.Column(db.String(30), index=False, unique=False, nullable=False)
    created = db.Column(db.DateTime, index=False, unique=False, nullable=False)

