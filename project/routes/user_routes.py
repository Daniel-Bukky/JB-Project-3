from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.user_controller import create_user, login_user, fetch_all_users

user_bp = Blueprint("user_routes", __name__)

@user_bp.route("/register", methods=["POST"])
def register_user_route():
    return create_user(request.json)

@user_bp.route("/login", methods=["POST"])
def login_user_route():
    return login_user(request.json)

@user_bp.route("/users", methods=["GET"])
# @jwt_required()
def get_all_users_route():
    return fetch_all_users()
