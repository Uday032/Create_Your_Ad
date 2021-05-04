"""Application routes."""
from datetime import datetime as dt

from flask import current_app as app
from flask import make_response, redirect, render_template, request, url_for, jsonify
from sqlalchemy import desc

from .serializer import UniversitySchema
from .models import University
from . import db

import json
import requests
from country_list import countries_for_language


@app.route('/mainpage')
def mainpage():
    return app.send_static_file('index.html')

@app.route("/", methods=["GET"])
def University_records():
    """Get All University Data in chunks"""
    start = request.args.get('start')
    count = request.args.get('count')

    universities = University.query.filter(University.id < start).order_by(desc(University.id))[:count]
    # print(universities[0].Name)
    university_schema = UniversitySchema(many=True)
    output = university_schema.dump(universities)
    return jsonify({'university': output})


@app.route("/filter", methods=["GET"])
def University_Filtered_records():
    """Get All University Data in chunks"""
    start = request.args.get('start')
    count = request.args.get('count')

    filterbyname = request.args.get('namefilter')
    countrycodefilter = request.args.get('countrycode')
    domainendfilter = request.args.get('domainend')

    search = "%{}%".format(filterbyname)
    domian = "%{}%".format(domainendfilter)

    print("filter", filterbyname, countrycodefilter, domainendfilter)
    madequery = University.query
    
    if(search != "%%"):
        print(search)
        madequery = University.query.filter(
            University.Name.like(search))
    
    
    if(countrycodefilter!=''):
        print("inside code", eval(countrycodefilter))

        madequery = madequery.filter(
            University.alpha_two_code == eval(countrycodefilter)["value"])

    if(domian != "%%"):
        print("inseide domain", domian)
        madequery = madequery.filter(University.domain.like(domian))
    
    madequery = madequery.filter(University.id < start).order_by(desc(University.id))[:count]
    print(madequery)
    university_schema = UniversitySchema(many=True)
    output = university_schema.dump(madequery)
    return jsonify({'filtered_university': output})


@app.route('/adduniversity', methods=["POST"])
def adduniversity():
    
    data = request.get_json()
    countries = dict(countries_for_language('en'))
    Name_input = data['name']
    alpha_two_code_input = data['alpha_two_code']
    domain_input = data['web_page'].replace("http://www.", "")
    web_page_input = data['web_page']
    country_input = countries[data['alpha_two_code']]

    new_University = University(
        Name=Name_input,
        alpha_two_code=alpha_two_code_input,
        domain=domain_input,
        web_page=web_page_input,
        country=country_input,
        created=dt.now(),
    )
    
    db.session.add(new_University)  # Adds new User record to database
    db.session.commit()
    return {'msg': 'University Added', 'success': True}

@app.route("/fake", methods=["GET"])
def create_fake_data():
    # fake = Faker()
    
    universities = University.query.all()
    print(len(universities))
    if(len(universities)==0):
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


        return { 'msg': 'Data Uploaded', 'success': True}
    return {'msg': 'Data is already Uploaded', 'success': False}


@app.route('/getcountries', methods=["GET"])
def getcountries():
    countries= list(countries_for_language('en'))

    return {"countries": countries}


@app.route('/delete', methods=["GET"])
def deleteuniversity():
    deleteid = request.args.get('deleteid')
    University.query.filter(University.id == deleteid).delete()
    db.session.commit()
    return {"success": True}


@app.route('/getuniqueueser', methods=["GET"])
def getoneuniversity():
    editid = request.args.get('editid')
    university = University.query.filter(University.id==editid).first()
    print(university)
    university_schema = UniversitySchema()
    output = university_schema.dump(university)
    return jsonify({'university': output})


@app.route('/updateuniversitydata', methods=["POST"])
def updateuniversitydata():

    data = request.get_json()
    university = University.query.filter(University.id == data['id']).first()
    university.Name = data['Name']
    university.alpha_two_code = data['alpha_two_code']
    university.domain = data['domain']
    university.web_page = data['web_page']
    university.country = data['country']
    db.session.commit()
    return jsonify({'updatedData': True})


