from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from controllers.vacation_controller import create_vacation, fetch_all_vacations, fetch_vacation_by_id, remove_vacation_by_id, update_vacation_by_id

vacation_bp = Blueprint("vacation_routes", __name__)

@vacation_bp.route("/vacation", methods=["POST"])
def add_vacation_route():
    return create_vacation(request.json)

@vacation_bp.route("/vacations", methods=["GET"])
def get_vacations_route():
    return fetch_all_vacations()

@vacation_bp.route("/vacation/<int:id>", methods=["GET"])
def get_vacation_route(id):
    return fetch_vacation_by_id(id)

@vacation_bp.route("/vacation/<int:id>", methods=["DELETE"])
def del_vacation_route(id):
    return remove_vacation_by_id(id)

@vacation_bp.route("/vacation/<int:id>", methods=["PUT"])
def update_vacation_route(id):
    return update_vacation_by_id(id, request.json)