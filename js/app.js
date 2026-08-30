// Referencia al formulario de checkout
const checkoutForm = document.getElementById('checkout-form');

checkoutForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que la página se recargue

  // 1. Obtener valores de los campos del formulario
  const name = document.getElementById('cust-name').value.trim();
  const email = document.getElementById('cust-email').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const city = document.getElementById('cust-city').value.trim();
  const address = document.getElementById('cust-address').value.trim();
  const paymentMethod = document.getElementById('cust-payment').value;

  // 2. Validar que el carrito no esté vacío (asumiendo que guardas tus productos en un array 'cart')
  if (typeof cart === 'undefined' || cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  // 3. Procesar según la opción seleccionada
  if (paymentMethod === 'contraentrega') {
    procesarPedidoWhatsApp({ name, email, phone, city, address });
  } else if (paymentMethod === 'mercadopago') {
    procesarPedidoMercadoPago({ name, email, phone, city, address });
  } else {
    alert('Por favor selecciona un método de pago.');
  }
});

/**
 * OPCIÓN A: INTEGRACIÓN CON WHATSAPP
 * Construye un mensaje con el resumen del pedido y abre el chat oficial.
 */
function procesarPedidoWhatsApp(cliente) {
  // Número de WhatsApp de tu tienda (Incluye código de país, ej: 57 para Colombia)
  const phoneStore = "573124376507"; // <--- REEMPLAZA POR TU NÚMERO DE WHATSAPP

  // Resumen de productos
  let itemsSummary = "";
  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    itemsSummary += `\n• ${item.nombre} (x${item.cantidad}) - $${subtotal.toLocaleString('es-CO')} COP`;
  });

  // Construir mensaje estructurado
  const mensaje = 
`*NUEVO PEDIDO - OSIRIS STREETWEAR* 🛍️

*Cliente:* ${cliente.name}
*Teléfono:* ${cliente.phone}
*Correo:* ${cliente.email}
*Ciudad:* ${cliente.city}
*Dirección:* ${cliente.address}

*PRODUCTOS:*${itemsSummary}

*TOTAL A PAGAR:* $${total.toLocaleString('es-CO')} COP
*Método de Pago:* Contraentrega / Transferencia`;

  // Codificar el texto para la URL de WhatsApp
  const urlWhatsApp = `https://wa.me/${phoneStore}?text=${encodeURIComponent(mensaje)}`;

  // Abrir WhatsApp en una pestaña nueva
  window.open(urlWhatsApp, '_blank');
}

/**
 * OPCIÓN B: INTEGRACIÓN CON MERCADO PAGO
 * Envía los datos a tu servidor backend (NodeJS, Python, PHP, etc.) 
 * para generar el link de pago seguro (Preference ID).
 */
async function procesarPedidoMercadoPago(cliente) {
  const payBtn = document.getElementById('pay-btn');
  payBtn.disabled = true;
  payBtn.textContent = "Cargando pasarela...";

  try {
    // Petición a tu API Backend que crea la preferencia en Mercado Pago
    const response = await fetch('/api/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'json'
      },
      body: JSON.stringify({
        items: cart, // Envia los ítems del carrito
        payer: cliente
      })
    });

    const data = await response.json();

    if (data.init_point) {
      // Redirige al cliente a la pasarela oficial de checkout de Mercado Pago
      window.location.href = data.init_point;
    } else {
      alert("Hubo un error al generar el pago con Mercado Pago.");
    }
  } catch (error) {
    console.error("Error Mercado Pago:", error);
    alert("No se pudo conectar con el servidor de pago.");
  } finally {
    payBtn.disabled = false;
    payBtn.textContent = "Procesar Pedido";
  }
}