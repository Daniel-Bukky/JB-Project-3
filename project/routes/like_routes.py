from flask import Blueprint, request, jsonify
from controllers.like_controller import create_like, fetch_all_likes, fetch_likes_by_user_id, del_like

like_bp = Blueprint("like_routes", __name__)

@like_bp.route("/like/", methods=["POST", "OPTIONS"])
def add_like_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200
    try:
        print("Request headers:", dict(request.headers))  # Debug headers
        print("Request data:", request.get_data())  # Debug raw request data
        print("Request JSON:", request.json)  # Debug parsed JSON
        return create_like(request.json)
    except Exception as e:
        print(f"Route error: {str(e)}")
        return jsonify({"error": "Route error", "details": str(e)}), 500

@like_bp.route("/likes/", methods=["GET", "OPTIONS"])
def get_all_likes_route():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200
    return fetch_all_likes()

@like_bp.route("/likes/<int:user_id>", methods=["GET", "OPTIONS"])
def get_likes_of_user_route(user_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200
    return fetch_likes_by_user_id(user_id)

@like_bp.route("/like/<int:user_id>/<int:vacation_id>", methods=["DELETE", "OPTIONS"])
def delete_like_route(user_id, vacation_id):
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200
    try:
        return del_like(user_id, vacation_id)
    except Exception as e:
        print(f"Route error: {str(e)}")
        return jsonify({"error": "Route error", "details": str(e)}), 500





