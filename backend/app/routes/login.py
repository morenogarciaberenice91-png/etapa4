from flask import Blueprint, request, jsonify

login_bp = Blueprint("login", __name__)

@login_bp.route("/api/login", methods=["POST"])
def login():
    try:
        datos = request.get_json(silent=True)
        if not datos or not isinstance(datos, dict):
            return jsonify({"success": False, "message": "El cuerpo de la petición debe ser un objeto JSON válido"}), 400

        username = datos.get("username")
        password = datos.get("password")

        # Permitir acceso directo para pruebas del frontend
        return jsonify({
            "success": True, 
            "message": "Inicio de sesión exitoso",
            "usuario": username
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": f"Error en el servidor: {str(e)}"}), 500