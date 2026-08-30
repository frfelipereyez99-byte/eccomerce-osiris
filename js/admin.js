import { db } from "./firebase.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const listaPedidos = document.getElementById("lista-pedidos");
const totalPedidos = document.getElementById("total-pedidos");
const totalVentas = document.getElementById("total-ventas");
const totalPendientes = document.getElementById("total-pendientes");

function formatearPrecio(precio) {
  return Number(precio || 0).toLocaleString("es-CO");
}

async function cargarPedidos() {
  try {
    const consulta = query(collection(db, "pedidos"), orderBy("fecha", "desc"));
    const snapshot = await getDocs(consulta);
    let acumuladoVentas = 0;
    let contadorPendientes = 0;

    if (snapshot.empty) {
      if (listaPedidos) listaPedidos.innerHTML = "<p>No hay pedidos registrados.</p>";
      if (totalPedidos) totalPedidos.textContent = "0";
      if (totalVentas) totalVentas.textContent = "$0 COP";
      if (totalPendientes) totalPendientes.textContent = "0";
      return;
    }

    if (listaPedidos) {
      listaPedidos.innerHTML = snapshot.docs.map((docSnapshot) => {
        const pedido = docSnapshot.data();
        const totalPedido = Number(pedido.total || 0);
        acumuladoVentas += totalPedido;

        const estado = (pedido.estado || "pendiente").toLowerCase();
        if (estado === "pendiente") contadorPendientes++;

        const productosHTML = (pedido.productos || []).map((prod) => `
          <li>${prod.nombre} x ${prod.cantidad} - $${formatearPrecio(prod.precio * prod.cantidad)}</li>
        `).join("");

        return `
          <article class="pedido-card">
            <div class="pedido-top">
              <span class="estado-${estado}">${pedido.estado || "Pendiente"}</span>
              <strong>$${formatearPrecio(totalPedido)}</strong>
            </div>
            <h3>${pedido.cliente?.nombre || "Sin Nombre"}</h3>
            <p>📧 ${pedido.cliente?.email || "N/A"}</p>
            <p>📞 ${pedido.cliente?.telefono || "N/A"}</p>
            <p>📍 ${pedido.cliente?.direccion || "N/A"}, ${pedido.cliente?.ciudad || "N/A"}</p>
            <ul class="pedido-productos">
              ${productosHTML}
            </ul>
          </article>
        `;
      }).join("");
    }

    if (totalPedidos) totalPedidos.textContent = snapshot.size;
    if (totalVentas) totalVentas.textContent = `$${formatearPrecio(acumuladoVentas)} COP`;
    if (totalPendientes) totalPendientes.textContent = contadorPendientes;

  } catch (error) {
    console.error("Error al cargar pedidos:", error);
    if (listaPedidos) listaPedidos.innerHTML = "<p>Error al cargar el historial de pedidos.</p>";
  }
}

document.addEventListener("DOMContentLoaded", cargarPedidos);