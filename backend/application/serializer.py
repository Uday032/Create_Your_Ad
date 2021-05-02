from .models import University
from . import ma


class UniversitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = University
