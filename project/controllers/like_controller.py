from flask import jsonify
from models.like_model import add_like, get_all_likes, get_like_by_id, delete_like_by_id


#TODO change names and whatever

def create_like(data):
    like_name = data.get("like_name")
    if not like_name:
        return jsonify({"error": "like like_name is required"}), 400

    like_id = add_like(like_name)
    return jsonify({"message": "like added successfully!", "like_id": like_id}), 201

def fetch_all_likes():
    likes = get_all_likes()
    return jsonify([{"id": like[0], "like_name": like[1]} for like in likes]), 200


def fetch_like_by_id(id):
    like = get_like_by_id(id)
    if not like:
        return jsonify({"error":"like not found"}), 404
    return jsonify({"id": like[0], "like_name": like[1]}), 200


def del_like(id):
    like_id = delete_like_by_id(id)
    if not like_id:
        return jsonify({"error":"like not found"}), 404 
    return jsonify({"id": id, "success": "deleted"}), 200