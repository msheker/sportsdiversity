# import necessary libraries
import os
from flask import Flask, jsonify, render_template, Response, request
import json
import psycopg2
from config import config

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################


# create route that renders index.html template
@app.route("/")
def home():
    return render_template('index_revised.html')


@app.route("/nba_vp_2")
def Javier():
    return render_template('nba_vp_2.html')

@app.route("/drill_down")
def drill_down():
    return render_template('drill_down.html')

@app.route("/sunburst")
def sunburst():
    return render_template('sunburst.html')
# Query the database and send the jsonified results to the site

# you can add user input inside <> and insert it into the funcion
@app.route("/new_get_info")
def try_it():
    return render_template("get_info.html")

@app.route("/get_info")

def get_info():
            # userInput = request.args.get('userInput')
    userInput = "coaches"
    """ query data from the coaches table """
    conn = None
    output = []
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute("SELECT *  FROM " + userInput)
        # you can add user input into the database call
        row = cur.fetchone()
        while row is not None:
           output.append(row)
           row = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
    return jsonify(output)
if __name__ == "__main__":
    app.run(debug = True)


# where \"Race\" = 'White'"
