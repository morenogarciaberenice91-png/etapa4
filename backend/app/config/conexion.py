import pymysql
from pymysql import Error
HOST = "localhost"
USER = "root"
PASSWORD = ""
DATABASE = "tecnico"
def conectar():
    try:
        conexion = pymysql.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            database=DATABASE
        )
        print("Conexión exitosa a la base de datos")
        return conexion
    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None