from models.db_config import get_db_connection

def register_user(firstname, lastname, email, hashed_password):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO users (firstname, lastname, email, password)
        VALUES (%s, %s, %s, %s) RETURNING id
    """, (firstname, lastname, email, hashed_password))
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_id

def get_user_by_email(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, password FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user
 
def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT users.id, users.firstname, users.lastname, users.email
    """)
    users = cur.fetchall()
    cur.close()
    conn.close()
    return users
