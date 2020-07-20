# query postgress
import psycopg2
from config import config

def get_coaches():
    """ query data from the coaches table """
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        coaches = cur.execute("SELECT *  FROM coaches where Race = White")
        print("coach data: ", cur.rowcount)
        row = cur.fetchone()

        while row is not None:
            print(row)
            row = cur.fetchone()

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        print("there is an error")
    finally:
        if conn is not None:
            conn.close()

    return coaches
if __name__ == '__main__':
    get_coaches()
