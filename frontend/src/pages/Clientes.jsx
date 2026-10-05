import { useEffect, useState } from "react";
import { 
  obtenerClientes, 
  crearCliente, 
  actualizarCliente, 
  eliminarCliente 
} from "../services/api";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // Función auxiliar optimizada para extraer y actualizar la lista de clientes
  const procesarRespuestaClientes = (resultado) => {
    if (resultado.ok && resultado.datos) {
      const lista = Array.isArray(resultado.datos)
        ? resultado.datos
        : (resultado.datos.data || resultado.datos.clientes || []);
      setClientes(lista);
    } else {
      setMensaje("No se pudieron obtener los clientes");
    }
  };

  // Función para refrescar la lista de clientes tras guardar o eliminar
  const cargarClientes = async () => {
    try {
      const resultado = await obtenerClientes();
      procesarRespuestaClientes(resultado);
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor");
    }
  };

  // Carga inicial usando una variable de control para evitar advertencias en React
  useEffect(() => {
    let cancelado = false;

    const inicializar = async () => {
      try {
        const resultado = await obtenerClientes();
        if (!cancelado) {
          procesarRespuestaClientes(resultado);
        }
      } catch (error) {
        if (!cancelado) {
          console.error(error);
          setMensaje("Error al conectar con el servidor");
        }
      }
    };

    inicializar();

    return () => {
      cancelado = true;
    };
  }, []);

  // Manejo del formulario (Crear / Editar)
  const guardar = async (e) => {
    e.preventDefault();
    
    if (!nombre || !nombre.trim()) {
      setMensaje("El nombre es obligatorio");
      return;
    }

    const r = editandoId
      ? await actualizarCliente(editandoId, { nombre })
      : await crearCliente({ nombre });

    setMensaje(r.datos?.message || "Solicitud procesada");
    
    if (r.ok) {
      setNombre("");
      setEditandoId(null);
      await cargarClientes();
    }
  };

  // Cargar datos en el formulario para editar
  const prepararEdicion = (cliente) => {
    setEditandoId(cliente.id);
    setNombre(cliente.nombre);
  };

  // Cancelar modo edición
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombre("");
  };

  // Eliminar cliente
  const borrar = async (id) => {
    if (!window.confirm("¿Eliminar este cliente de prueba?")) return;
    
    const r = await eliminarCliente(id);
    setMensaje(r.datos?.message || "Solicitud procesada");
    
    if (r.ok) await cargarClientes();
  };

  return (
    <div className="dashboard">
      <h1>Clientes</h1>
      
      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Formulario para registrar y editar */}
      <form onSubmit={guardar} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del cliente"
        />
        <button type="submit">
          {editandoId ? "Actualizar" : "Guardar"}
        </button>
        {editandoId && (
          <button type="button" onClick={cancelarEdicion}>
            Cancelar
          </button>
        )}
      </form>

      {/* Tabla con la lista de clientes */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>
                <button onClick={() => prepararEdicion(cliente)}>
                  Editar
                </button>
                <button onClick={() => borrar(cliente.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;