from flask import Blueprint, request
from controllers.like_controller import create_like, fetch_all_likes , fetch_likes_by_user_id, del_like

like_bp = Blueprint("like_routes", __name__)

@like_bp.route("/like", methods=["POST"])
def add_like_route():
    return create_like(request.json)

@like_bp.route("/likes/", methods=["GET"])
def get_all_likes_route():
    return fetch_all_likes()


@like_bp.route("/likes/<int:user_id>", methods=["GET"])
def get_likes_of_user_route(user_id):
    return fetch_likes_by_user_id(user_id)


@like_bp.route("/like/<int:user_id>/<int:vacation_id>", methods=["DELETE"])
def delete_like_route(user_id, vacation_id):
    return del_like(user_id, vacation_id)





