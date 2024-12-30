from flask import Blueprint, request
from controllers.country_controller import create_country, fetch_all_countries , fetch_country_by_id, del_country_by_id, update_country

country_bp = Blueprint("country_routes", __name__)

@country_bp.route("/country", methods=["POST"])
def add_country_route():
    return create_country(request.json)

@country_bp.route("/countries", methods=["GET"])
def get_all_countries_route():
    return fetch_all_countries()


@country_bp.route("/country/<int:id>", methods=["GET"])
def get_country_by_id(id):
    return fetch_country_by_id(id)


@country_bp.route("/country/<int:id>", methods=["DELETE"])
def delete_country_by_id(id):
    return del_country_by_id(id)

@country_bp.route("/country/<int:id>", methods=["PUT"])
def update_country_by_id(id):
    return update_country(id, request.json)





