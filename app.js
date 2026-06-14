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

obtenerProductos();