from flask import Flask

def create_app():
    app = Flask(__name__)

    # Importar y registrar el Blueprint de login
    from app.routes.login import login_bp
    app.register_blueprint(login_bp)

    return app