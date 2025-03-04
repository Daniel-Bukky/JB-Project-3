from flask import jsonify
from models.like_model import add_like, get_all_likes, get_like, delete_like
from models.vacation_model import get_all_vacations
from models.country_model import get_all_countries

def create_like(data):
    try:
        user_id = data.get("user_id")
        vacation_id = data.get("vacation_id")
        
        if not user_id:
            return jsonify({"error": "like user_id is required"}), 400
        if not vacation_id:
            return jsonify({"error": "like vacation_id is required"}), 400

        add_like(user_id, vacation_id)
        print(f"Successfully added like for user {user_id} on vacation {vacation_id}")  # Success log
        return jsonify({"message": "like added successfully!", "user_id": user_id, "vacation_id": vacation_id}), 201
    except Exception as e:
        print(f"Error creating like: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


def fetch_all_likes():
    likes = get_all_likes()
    

    return jsonify(likes)


def fetch_likes_by_user_id(user_id):
    # Call the fetch_all_likes function and get the data from the response
    likes_response = fetch_all_likes()
    likes = likes_response.get_json()  # Extract the data from the response

    # Now you can filter the likes by user_id and structure the response
    filtered_likes = [{'user_id': userlikes[0], 'vacation_id': userlikes[1]} for userlikes in likes if userlikes[0] == user_id]

    return jsonify(filtered_likes), 200


def del_like(user_id, vacation_id):
    try:
        like = delete_like(user_id, vacation_id)
        if not like:
            print(f"Like not found for user {user_id} on vacation {vacation_id}")  # Not found log
            return jsonify({"error": "like not found"}), 404
        print(f"Successfully deleted like for user {user_id} on vacation {vacation_id}")  # Success log
        return jsonify({"user_id": user_id, "vacation_id": vacation_id, "success": "deleted"}), 200
    except Exception as e:
        print(f"Error deleting like: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

def get_like_statistics():
    likes = get_all_likes()
    return jsonify({"likes": len(likes)}), 200
