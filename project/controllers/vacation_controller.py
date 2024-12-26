from flask import jsonify
from models.vacation_model import add_vacation, get_vacation_by_id, get_all_vacations, delete_vacation_by_id, update_vacation_by_id
  
def create_vacation(data):
    vacation_name = data.get("vacation_name")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    description = data.get("description")
    price = data.get("price")
    img_url = data.get("img_url")

    if not vacation_name:
        return jsonify({"error": "vacation name is required"}), 400
    if not start_date:
        return jsonify({"error": "vacation start date is required"}), 400
    if not end_date:
        return jsonify({"error": "vacation end date is required"}), 400
    if not price:
        return jsonify({"error": "vacation price is required"}), 400
    if not img_url:
        return jsonify({"error": "vacation image_url is required"}), 400
        
    vacation_id = add_vacation(vacation_name, start_date, end_date, description, price, img_url)
    return jsonify({"message": "vacation added successfully!", "procuct_id": vacation_id}), 201

def fetch_all_vacations():
    vacations= get_all_vacations()
    return jsonify([{"id": vacation[0], "vacation_name": vacation[1] , "start_date": vacation[2] ,"end_date": vacation[3] ,"description":vacation[4],"price": vacation[5] ,"image_url": vacation[6] ,} for vacation in vacations]), 200


def fetch_vacation_by_id(id):
    vacation = get_vacation_by_id(id)
    if not vacation:
        return jsonify({"error":"vacation not found"}), 404
    return jsonify({"id": vacation[0], "vacation_name": vacation[1] , "start_date": vacation[2] ,"end_date": vacation[3] ,"description":vacation[4],"price": vacation[5] ,"image_url": vacation[6] ,}), 200


def remove_vacation_by_id(id):
    vacation_id = delete_vacation_by_id(id)
    if not vacation_id:
        return jsonify({"error":"vacation not found"}), 404 
    return jsonify({"id": id, "success": "deleted"}), 200

def update_vacation_by_id(id, data):
    vacation_name = data.get("vacation_name")
    start_date = data.get("start_date")
    end_date = data.get("end_date")
    description = data.get("description")
    price = data.get("price")
    img_url = data.get("img_url")
    if not vacation_name:
        return jsonify({"error":"vacation name is require"}), 400 
    if not start_date:
        return jsonify({"error":"vacation start date is require"}), 400 
    if not end_date:
        return jsonify({"error":"vacation end date is require"}), 400 
    if not price:
        return jsonify({"error":"vacation price is require"}), 400 
    if not img_url:
        return jsonify({"error":"vacation image_url is require"}), 400 
    vacation_id = update_vacation_by_id(id, vacation_name)
    if vacation_id is None:
        return jsonify({"error":"vacation not found"})
    return jsonify({"message":"Vacation updated successfully", "vacation_id":vacation_id}), 200
