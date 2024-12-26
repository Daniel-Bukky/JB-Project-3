from models.db_config import get_db_connection

def add_like(user_id, vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO likes (user_id, vacation_id) VALUES (%s, %s)", (user_id, vacation_id,))
    conn.commit()
    cur.close()
    conn.close()

def get_all_likes():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM likes")
    likes = cur.fetchall()
    cur.close()
    conn.close()
    return likes

def get_like(user_id, vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM likes where (%s) = like_id (%s) = vacation_id", (user_id, vacation_id,))
    like = cur.fetchone()
    cur.close()
    conn.close()
    return like

def delete_like(user_id, vacation_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("delete FROM likes where (%s) = user_id (%s) = vacation_id", (user_id, vacation_id,))
    rows = cur.rowcount
    conn.commit()
    cur.close()
    conn.close()
    return rows