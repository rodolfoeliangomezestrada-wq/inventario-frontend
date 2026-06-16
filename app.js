const API_URL = "https://inventario-backend-z1mo.onrender.com/productos";

async function obtenerProductos() {
  try {
    const res = await fetch(API_URL);
    const datos = await res.json();
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    datos.forEach(prod => {
      tabla.innerHTML += `
        <tr>
          <td>${prod.nombre}</td>
          <td>$${prod.precio}</td>
          <td>${prod.existencia} pzas</td>
          <td>
            <button onclick="editarProducto('${prod._id}', '${prod.nombre}', ${prod.precio}, ${prod.existencia})" style="background:#f59e0b;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;margin-right:5px;">✏️ Editar</button>
            <button onclick="eliminarProducto('${prod._id}')" style="background:#ef4444;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">🗑️ Eliminar</button>
          </td>
        </tr>`;
    });
  } catch (err) {
    console.error("Error al traer datos:", err);
  }
}

async function agregarProducto() {
  const nuevoObj = {
    nombre: document.getElementById("nombre").value,
    precio: Number(document.getElementById("precio").value),
    existencia: Number(document.getElementById("existencia").value)
  };
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoObj)
    });
    if (res.ok) {
      alert("¡Guardado con éxito en MongoDB Atlas!");
      document.getElementById("nombre").value = "";
      document.getElementById("precio").value = "";
      document.getElementById("existencia").value = "";
      obtenerProductos();
    }
  } catch (err) {
    console.error("Error al enviar datos:", err);
  }
}

async function editarProducto(id, nombre, precio, existencia) {
  const nuevoNombre = prompt("Nombre del producto:", nombre);
  if (!nuevoNombre) return;
  const nuevoPrecio = prompt("Precio:", precio);
  const nuevaExistencia = prompt("Existencia:", existencia);

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nuevoNombre,
        precio: Number(nuevoPrecio),
        existencia: Number(nuevaExistencia)
      })
    });
    obtenerProductos();
  } catch (err) {
    console.error("Error al editar:", err);
  }
}

async function eliminarProducto(id) {
  if (!confirm("¿Eliminar este producto?")) return;
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    obtenerProductos();
  } catch (err) {
    console.error("Error al eliminar:", err);
  }
}

obtenerProductos();