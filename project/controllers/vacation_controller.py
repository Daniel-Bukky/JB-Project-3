from flask import jsonify
from models.vacation_model import add_vacation, get_vacation_by_id, get_all_vacations, delete_vacation_by_id, update_vacation_by_id
from datetime import date, datetime

def create_vacation(data):
    print(data)
    description = data.get("description")
    price = data.get("price")
    img_url = data.get("image_url")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    country_id = data.get("country_id")

    if not country_id:
        return jsonify({"error": "vacation name is required"}), 400
    if not start_date:
        return jsonify({"error": "vacation start date is required"}), 400
    if not end_date:
        return jsonify({"error": "vacation end date is required"}), 400
    if not price:
        return jsonify({"error": "vacation price is required"}), 400
    if not img_url:
        return jsonify({"error": "vacation image_url is required"}), 400
    start_date = datetime.strptime(start_date, f"%Y-%m-%dT%H:%M:%S.%fZ")
    end_date = datetime.strptime(end_date, f"%Y-%m-%dT%H:%M:%S.%fZ")
    vacation_id = add_vacation(country_id, start_date, end_date, description, price, img_url)
    return jsonify({"message": "vacation added successfully!", "vacation_id": vacation_id}), 201

def fetch_all_vacations():
    vacations= get_all_vacations()
    return jsonify([{"id": vacation[0], "country_id": vacation[1] , "start_date": vacation[2] ,"end_date": vacation[3] ,"description":vacation[4],"price": vacation[5] ,"image_url": vacation[6] ,} for vacation in vacations]), 200


def get_vacation_statistics():
    try:
        # Get raw vacations data
        vacations = get_all_vacations()
        today = date.today()
        
        # Initialize categories
        past_vacations = []
        ongoing_vacations = []
        future_vacations = []
        
        # Categorize each vacation
        for vacation in vacations:
            # Convert vacation data to dictionary
            vacation_dict = {
                "id": vacation[0],
                "country_id": vacation[1],
                "start_date": str(vacation[2]),  # Convert date to string for JSON
                "end_date": str(vacation[3]),
                "description": vacation[4],
                "price": float(vacation[5]),
                "image_url": vacation[6]
            }
            
            # Convert string dates to date objects if they're strings
            start_date = vacation[2] if isinstance(vacation[2], date) else datetime.strptime(vacation[2], '%Y-%m-%d').date()
            end_date = vacation[3] if isinstance(vacation[3], date) else datetime.strptime(vacation[3], '%Y-%m-%d').date()
            
            # Categorize based on dates
            if end_date < today:
                past_vacations.append(vacation_dict)
            elif start_date > today:
                future_vacations.append(vacation_dict)
            else:
                ongoing_vacations.append(vacation_dict)
        
        return jsonify({
            "past_vacations": past_vacations,
            "ongoing_vacations": ongoing_vacations,
            "future_vacations": future_vacations
        }), 200
        
    except Exception as e:
        print(f"Error fetching vacation statistics: {str(e)}")
        return jsonify({"error": "Failed to fetch vacation statistics"}), 500

def fetch_vacation_by_id(id):
    vacation = get_vacation_by_id(id)
    if not vacation:
        return jsonify({"error":"vacation not found"}), 404
    return jsonify({"id": vacation[0], "country_id": vacation[1] , "start_date": vacation[2] ,"end_date": vacation[3] ,"description":vacation[4],"price": vacation[5] ,"image_url": vacation[6] ,}), 200


def remove_vacation_by_id(id):
    vacation_id = delete_vacation_by_id(id)
    if not vacation_id:
        return jsonify({"error":"vacation not found"}), 404 
    return jsonify({"id": id, "success": "deleted"}), 200

def modify_vacation_by_id(id, data):
    country_id = data.get("country_id")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    description = data.get("description")
    price = data.get("price")
    img_url = data.get("image_url")
    
    # Validation to avoid passing None to SQL
    if not country_id:
        return jsonify({"error": "vacation country_id is required"}), 400
    if not start_date:
        return jsonify({"error": "vacation start date is required"}), 400
    if not end_date:
        return jsonify({"error": "vacation end date is required"}), 400
    if not price:
        return jsonify({"error": "vacation price is required"}), 400
    if not img_url:
        return jsonify({"error": "vacation image_url is required"}), 400

    # Correct call with all required arguments
    vacation_id = update_vacation_by_id(
        id, country_id, start_date, end_date, description, price, img_url
    )
    
    if vacation_id is None:
        return jsonify({"error": "vacation not found"}), 404
    
    return jsonify({"message": "Vacation updated successfully", "vacation_id": vacation_id}), 200