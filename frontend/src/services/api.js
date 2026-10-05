const API_URL = "http://127.0.0.1:5000/api/clientes";

export async function obtenerClientes() {
  const r = await fetch(API_URL);
  return { ok: r.ok, datos: await r.json() };
}

export async function crearCliente(cliente) {
  const r = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  return { ok: r.ok, datos: await r.json() };
}

export async function actualizarCliente(id, cliente) {
  const r = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente)
  });
  return { ok: r.ok, datos: await r.json() };
}

export async function eliminarCliente(id) {
  const r = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE" 
  });
  return { ok: r.ok, datos: await r.json() };
}
export async function login(credenciales) {
  const payload = {
    username: credenciales?.username || credenciales?.usuario || "admin",
    password: credenciales?.password || credenciales?.contrasena || "123456"
  };

  const r = await fetch("http://127.0.0.1:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  
  return { ok: r.ok, datos: await r.json() };
}