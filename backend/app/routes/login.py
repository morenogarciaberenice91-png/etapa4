from flask import Blueprint, request, jsonify
from app.config.conexion import conectar
login_bp = Blueprint("login", __name__)
@login_bp.route("/api/login", methods=["POST"])
def login():
    try:
        datos = request.get_json(silent=True)
        if not datos or not isinstance(datos, dict):
            return jsonify({"success": False, "message": "El cuerpo de la petición debe ser un objeto JSON válido"}), 400

        username = datos.get("username")
        password = datos.get("password")

        conexion = conectar()
        if not conexion:
            return jsonify({"success": False, "message": "Error de conexión a la base de datos"}), 500

        cursor = conexion.cursor()
        consulta = "SELECT username FROM usuario WHERE username = %s AND password = %s"
        cursor.execute(consulta, (username, password))
        usuario = cursor.fetchone()

        cursor.close()
        conexion.close()

        if usuario:
            return jsonify({"success": True, "message": "Inicio de sesión correcto", "username": usuario[0]}), 200
        else:
            return jsonify({"success": False, "message": "Credenciales incorrectas"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": f"Error interno: {str(e)}"}), 500