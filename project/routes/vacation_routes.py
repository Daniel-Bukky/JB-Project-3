from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from controllers.vacation_controller import create_vacation, fetch_all_vacations, fetch_vacation_by_id, remove_vacation_by_id, modify_vacation_by_id, get_vacation_statistics

vacation_bp = Blueprint("vacation_routes", __name__)

@vacation_bp.route("/vacation/statistics", methods=["GET"])
def get_vacation_statistics_route():
    return get_vacation_statistics()

@vacation_bp.route("/vacation", methods=["POST"])
def add_vacation_route():
    return create_vacation(request.json)

@vacation_bp.route("/vacations", methods=["GET"])
def get_vacations():
    return fetch_all_vacations()

@vacation_bp.route("/vacation/<int:id>", methods=["GET"])
def get_vacation_route(id):
    return fetch_vacation_by_id(id)

@vacation_bp.route("/vacation/<int:id>", methods=["DELETE"])
def del_vacation_route(id):
    return remove_vacation_by_id(id)

@vacation_bp.route("/vacation/<int:id>", methods=["PUT"])
def upd_vacation_route(id):
    return modify_vacation_by_id(id, request.json)