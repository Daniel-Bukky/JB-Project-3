from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.vacation_controller import create_vacation, fetch_all_vacations, fetch_vacation_by_id, remove_vacation_by_id, update_vacation_by_id

vacation_bp = Blueprint("vacation_routes", __name__)

@vacation_bp.route("/vacations", methods=["POST"])
def add_procuct_route():
    return create_vacation(request.json)

@vacation_bp.route("/vacations", methods=["GET"])
def get_vacations_route():
    return fetch_all_vacations()

# @user_bp.route("/users", methods=["GET"])
# @jwt_required()
# def get_all_users_route():
#     return fetch_all_users()
