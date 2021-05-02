"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for, jsonify

from .serializer import UniversitySchema
from .models import University
from . import db

import requests

@app.route("/", methods=["GET"])
def user_records():
    """Create a user via query string parameters."""
    universities = University.query.all()
    print(universities[0].Name)
    university_schema = UniversitySchema(many=True)
    output = university_schema.dump(universities)
    return jsonify({'university': output})


@app.route("/fake", methods=["GET"])
def create_fake_data():
    # fake = Faker()
    

    data = requests.get(
        'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json').json()
    
    insertdata = []
    for universiy in data:
        
        Name_input = universiy['name']
        alpha_two_code_input = universiy['alpha_two_code']
        domain_input = universiy['domains'][0]
        web_page_input = universiy['web_pages'][0]
        country_input = universiy['country']

        # print((Name, alpha_two_code, domain, web_page, country))
        new_University = University(
            Name=Name_input,
            alpha_two_code=alpha_two_code_input,
            domain=domain_input,
            web_page=web_page_input,
            country=country_input,
            created=dt.now(),
        )

        insertdata.append(new_University)
    # print(insertdata)
    db.session.add_all(insertdata)  # Adds new User record to database
    db.session.commit()  # Commits all changes 


    return { 'Status': 'Data Uploaded'}
