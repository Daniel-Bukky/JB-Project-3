from dotenv import load_dotenv
import os

# Load environment variables at the very beginning
load_dotenv()

from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager, 
    jwt_required, 
    get_jwt_identity,
    get_jwt
)
import jwt
from routes.country_routes import country_bp
from routes.user_routes import user_bp
from routes.vacation_routes import vacation_bp
from routes.like_routes import like_bp
from flask_cors import CORS

app = Flask(__name__)

# Print environment variables for debugging (remove in production)
print("DB_HOST:", os.getenv('DB_HOST'))
print("DB_NAME:", os.getenv('DB_NAME'))
print("DB_USER:", os.getenv('DB_USER'))

app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
# In your Flask app configuration
app.config['JWT_DECODE_ALGORITHMS'] = ['HS256']
app.config['JWT_DECODE_AUDIENCE'] = None
app.config['JWT_DECODE_ISSUER'] = None

# Enable CORS for all routes with more permissive settings for debugging
CORS(app, 
     resources={r"/*": {"origins": ["http://localhost:5173"]}},
     supports_credentials=True)

# Configure CORS headers for all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

jwt = JWTManager(app)

@app.route('/user-data', methods=['GET'])
@jwt_required()
def get_data():
    # flask_jwt_extended handles token validation automatically
    # get_jwt_identity() returns the identity that was used to create the JWT
    current_user_id = get_jwt_identity()
    
    # If you need the full JWT payload
    # jwt_payload = get_jwt()

    return jsonify({
        'message': 'Success',
        'user_id': current_user_id
    })


# Register blueprints
app.register_blueprint(country_bp)
app.register_blueprint(user_bp)
app.register_blueprint(vacation_bp)
app.register_blueprint(like_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
