from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    CORS(app)  # Habilita CORS para permitir la conexión con React

    # Importar y registrar el Blueprint de login
    from app.routes.login import login_bp
    app.register_blueprint(login_bp)

    return app