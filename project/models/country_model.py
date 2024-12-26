from models.db_config import get_db_connection

def add_country(name):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO countries (country_name) VALUES (%s) RETURNING country_id", (name,))
    country_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return country_id

def get_all_countries():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM countries")
    countries = cur.fetchall()
    cur.close()
    conn.close()
    return countries

def get_country_by_id(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM countries where (%s) = country_id", (id,))
    country = cur.fetchone()
    cur.close()
    conn.close()
    return country

def delete_country_by_id(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("delete FROM countries where (%s) = id RETURNING country_id", (id,))
    delete_id = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return delete_id

def update_country_by_id(id, new_country):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE countries SET country_name = (%s) where country_id = (%s) RETURNING country_id", (new_country, id))
    update_row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return update_row



