from models.db_config import get_db_connection

def add_vacation(country_id, start_date, end_date, description, price, img_url):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO vacations (location_id, start_date, end_date, description, price, img_url) 
        VALUES (%s, %s, %s, %s, %s, %s) RETURNING vacation_id
    """, (country_id, start_date, end_date, description, price, img_url,))
    vacation_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return vacation_id

def get_vacation_by_id(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM vacations WHERE vacation_id = %s", (id,))
    vacation = cur.fetchone()
    cur.close()
    conn.close()
    return vacation
 
def get_all_vacations():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT *
        FROM vacations
    """)
    vacations = cur.fetchall()
    cur.close()
    conn.close()
    return vacations

def delete_vacation_by_id(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("delete FROM vacations where (%s) = vacation_id RETURNING vacation_id", (id,))
    delete_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return delete_id

def update_vacation_by_id(vacation_id, country_id, start_date, end_date, description, price, img_url):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE vacations SET location_id = (%s) , start_date=(%s) , end_date=(%s) , description=(%s), price=(%s), img_url=(%s) where id = (%s) RETURNING id", (country_id, start_date, end_date, description, price, img_url, vacation_id))
    update_row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return update_row



