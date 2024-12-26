from flask import jsonify
from models.country_model import add_country, get_all_countries, get_country_by_id, delete_country_by_id, update_country_by_id
  
def create_country(data):
    country_name = data.get("country_name")
    if not country_name:
        return jsonify({"error": "country country_name is required"}), 400

    country_id = add_country(country_name)
    return jsonify({"message": "country added successfully!", "country_id": country_id}), 201

def fetch_all_countries():
    countries = get_all_countries()
    return jsonify([{"id": country[0], "country_name": country[1]} for country in countries]), 200


def fetch_country_by_id(id):
    country = get_country_by_id(id)
    if not country:
        return jsonify({"error":"country not found"}), 404
    return jsonify({"id": country[0], "country_name": country[1]}), 200


def del_country_by_id(id):
    country_id = delete_country_by_id(id)
    if not country_id:
        return jsonify({"error":"country not found"}), 404 
    return jsonify({"id": id, "success": "deleted"}), 200

def update_country(id, data):
    country_name = data.get("country_name")
    if not country_name:
        return jsonify({"error":"country country name is require"}), 400 
    country_id = update_country_by_id(id, country_name)
    if country_id is None:
        return jsonify({"error":"country not found"})
    return jsonify({"message":"country update successfully", "country id":country_id}), 200
