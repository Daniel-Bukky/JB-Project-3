from flask import jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from models.user_model import register_user, get_user_by_email, get_all_users, get_user_by_id

bcrypt = Bcrypt()
def create_user(data):
    firstname = data.get("firstname")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_id = register_user(firstname, lastname, email, hashed_password)
    return jsonify({"message": "User registered successfully!", "user_id": user_id}), 201

def login_user(data):
    print(fetch_all_users())
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = get_user_by_email(email)
    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    user_id, hashed_password, firstname, lastname, role = user
    if not bcrypt.check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user_id))
    return jsonify({"token": token, "firstname": firstname, "lastname":lastname, "role": role}), 200

def fetch_user_by_id(id):
    try:
        print(f"Fetching user with ID: {id}")
        user_id = int(id)
        user = get_user_by_id(user_id)
        print(f"Retrieved user: {user}")
        
        if user is None:
            print("User not found")
            return jsonify({"error": "User not found"}), 404
            
        try:
            user_id, firstname, lastname, email, hashed_password, role_id = user
            response = {
                "id": user_id,
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "role": role_id
            }
            print(f"Sending response: {response}")
            return jsonify(response), 200
        except (ValueError, TypeError) as e:
            print(f"Error unpacking user data: {str(e)}")
            print(f"User data received: {user}")
            return jsonify({"error": "Invalid user data format"}), 500
            
    except ValueError as ve:
        print(f"ValueError: {str(ve)}")
        return jsonify({"error": "Invalid user ID format"}), 400
    except Exception as e:
        print(f"Error fetching user: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def fetch_all_users():
    users = get_all_users()
    print(users)
    return jsonify([{
        "id": user[0],
        "firstname": user[1],
        "lastname": user[2],
        "email": user[3],
        "hashed_password": user[4]
    } for user in users]), 200
