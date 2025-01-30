from models.db_config import get_db_connection

def register_user(firstname, lastname, email, hashed_password):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO users (firstname, lastname, email, password, role_id)
        VALUES (%s, %s, %s, %s, %s) RETURNING user_id
    """, (firstname, lastname, email, hashed_password, 2))
    user_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return user_id

def get_user_by_email(email):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, password, firstname, lastname, role_id FROM users WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    return user
 
def get_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT user_id, firstname, lastname, email, password from users
    """)
    print("trying to print users")
    users = cur.fetchall()
    print(users)
    cur.close()
    conn.close()
    return users

def get_user_by_id(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute("""
            SELECT user_id, firstname, lastname, email, password, role_id 
            FROM users 
            WHERE user_id = %s
        """, (user_id,))
        
        user = cur.fetchone()
        
        cur.close()
        conn.close()
        
        return user
    except Exception as e:
        print(f"Database error: {str(e)}")
        raise e
