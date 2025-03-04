from flask import jsonify
from models.country_model import add_country, get_all_countries, get_country_by_id, delete_country_by_id, update_country_by_id
from models.vacation_model import get_all_vacations
from models.like_model import get_all_likes
from datetime import date, datetime


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
        return jsonify({"error": "country not found"}), 404
    return jsonify({"id": country[0], "country_name": country[1]}), 200


def del_country_by_id(id):
    country_id = delete_country_by_id(id)
    if not country_id:
        return jsonify({"error": "country not found"}), 404
    return jsonify({"id": id, "success": "deleted"}), 200


def update_country(id, data):
    country_name = data.get("country_name")
    if not country_name:
        return jsonify({"error": "country name is require"}), 400
    country_id = update_country_by_id(id, country_name)
    if country_id is None:
        return jsonify({"error": "country not found"})
    return jsonify({"message": "country update successfully", "country_id": id, "country_name": country_name}), 200

def get_country_statistics():
    try:
        # Get all likes grouped by vacation_id
        likes = get_all_likes()
        # Create a dictionary to count likes per vacation
        likes_per_vacation = {}
        for like in likes:
            vacation_id = like[1]  # Assuming like[1] is vacation_id
            likes_per_vacation[vacation_id] = likes_per_vacation.get(vacation_id, 0) + 1

        # Get all vacations with their country info
        vacations = get_all_vacations()
        today = date.today()
        
        # Initialize counters
        past_vacations = []
        ongoing_vacations = []
        future_vacations = []
        destination_likes = {}
        
        # Get all countries to map country_id to name
        countries = {country[0]: country[1] for country in get_all_countries()}
        
        # Process each vacation
        for vacation in vacations:
            vacation_id = vacation[0]
            country_id = vacation[1]
            start_date = vacation[2] if isinstance(vacation[2], date) else datetime.strptime(vacation[2], '%Y-%m-%d').date()
            end_date = vacation[3] if isinstance(vacation[3], date) else datetime.strptime(vacation[3], '%Y-%m-%d').date()
            destination = countries.get(country_id, "Unknown")
            
            # Count likes for this destination
            current_likes = likes_per_vacation.get(vacation_id, 0)
            destination_likes[destination] = destination_likes.get(destination, 0) + current_likes
            
            # Categorize vacation by date
            if end_date < today:
                past_vacations.append(vacation_id)
            elif start_date > today:
                future_vacations.append(vacation_id)
            else:
                ongoing_vacations.append(vacation_id)

        # Convert to list of dictionaries and sort by likes
        destinations_stats = [
            {"destination": dest, "likes": likes}
            for dest, likes in destination_likes.items()
        ]
        destinations_stats.sort(key=lambda x: x["likes"], reverse=True)
        
        return jsonify({
            "destinations": destinations_stats,
            "vacation_stats": {
                "total": len(vacations),
                "past": len(past_vacations),
                "ongoing": len(ongoing_vacations),
                "future": len(future_vacations)
            }
        }), 200
        
    except Exception as e:
        print(f"Error fetching country statistics: {str(e)}")
        return jsonify({"error": "Failed to fetch country statistics"}), 500


