from flask import jsonify
from models.like_model import add_like, get_all_likes, get_like, delete_like

def create_like(data):
    user_id = data.get("user_id")
    vacation_id = data.get("vacation_id")
    if not user_id:
        return jsonify({"error": "like user_id is required"}), 400
    if not vacation_id:
        return jsonify({"error": "like vacation_id is required"}), 400

    add_like(user_id, vacation_id)
    return jsonify({"message": "like added successfully!", "user_id": user_id, "vacation_id": vacation_id}), 201


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
    like = delete_like(user_id, vacation_id)
    if not like:
        return jsonify({"error": "like not found"}), 404
    return jsonify({"user_id": user_id, "vacation_id": vacation_id, "success": "deleted"}), 200
