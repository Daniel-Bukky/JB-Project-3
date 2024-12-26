from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routes.city_routes import city_bp
from routes.user_routes import user_bp
from routes.product_routes import product_bp

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
jwt = JWTManager(app)

# Enable CORS for the app
CORS(app)

# Register blueprints
app.register_blueprint(city_bp)
app.register_blueprint(user_bp)
app.register_blueprint(product_bp)

if __name__ == "__main__":
    app.run(debug=True)
