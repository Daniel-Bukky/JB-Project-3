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

app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
# In your Flask app configuration
app.config['JWT_DECODE_ALGORITHMS'] = ['HS256']
app.config['JWT_DECODE_AUDIENCE'] = None
app.config['JWT_DECODE_ISSUER'] = None



jwt = JWTManager(app)

# Enable CORS for the app
CORS(app, 
     resources={r"/*": {
         "origins": ["http://localhost:5173"],
         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
         "expose_headers": ["Content-Type", "Authorization"],
         "supports_credentials": True,
         "send_wildcard": False,
         "max_age": 86400  # Cache preflight requests for 24 hours
     }},
     allow_headers=["Content-Type", "Authorization"],
     expose_headers=["Content-Type", "Authorization"],
     supports_credentials=True
)

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
    app.run(debug=True)
