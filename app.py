# import necessary libraries
import os
from flask import Flask, jsonify, render_template, Response
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
    return render_template('index.html')


@app.route("/nba_vp_2")
def Javier():
    return render_template('nba_vp_2.html')


@app.route("/nba_coaches_2")
def coaches():
    return render_template('nba_coaches_2.html')

@app.route("/nba_players_2")
def players():
    return render_template('nba_players_2.html')

@app.route("/nba_owners_2")
def owners():
    return render_template('nba_owners_2.html')


@app.route("/drill_down")
def drill_down():
    return render_template('drill_down.html')

@app.route("/sunburst")
def sunburst():
    return render_template('sunburst.html')
# Query the database and send the jsonified results to the site



@app.route("/get_coaches")
def get_coaches():
    """ query data from the coaches table """
    conn = None
    coaches = []
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute("SELECT *  FROM coaches" )
        row = cur.fetchone()
        while row is not None:
           coaches.append(row)
           row = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return jsonify(coaches)
if __name__ == "__main__":
    app.run(debug = True)


# where \"Race\" = 'White'"
