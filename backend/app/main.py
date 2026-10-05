from app import create_app
from app.routes.clientes import clientes_bp

app = create_app()

# Registrar el blueprint antes de iniciar el servidor
app.register_blueprint(clientes_bp)

if __name__ == "__main__":
    app.run(debug=True)