// Array para almacenar el carrito
let cart = [];

// Inicializar Mercado Pago con tu Credencial Pública de Prueba (Public Key Sandbox)
// Esta clave es pública y provista por Mercado Pago para pruebas libres de portafolio
const mp = new MercadoPago('TEST-cb48b2eb-6be5-4670-8b17-762bb1e828df', {
  locale: 'es-CO'
});

// Función para abrir/cerrar el carrito
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

// Función para agregar productos al carrito
function addToCart(id, name, price, image) {
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1
    });
  }

  updateCartUI();
  toggleCart();
}

// Función para actualizar la vista del carrito
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; color:#888; padding: 20px 0;">Tu carrito está vacío</p>';
    if (cartCount) cartCount.innerText = '0';
    if (cartTotalPrice) cartTotalPrice.innerText = '$0 COP';
    return;
  }

  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalCount = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    totalCount += item.quantity;

    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="50" height="50">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price.toLocaleString('es-CO')} COP</p>
        <div class="cart-qty-controls">
          <button type="button" onclick="changeQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button type="button" onclick="changeQuantity('${item.id}', 1)">+</button>
        </div>
      </div>
      <button type="button" class="remove-btn" onclick="removeFromCart('${item.id}')">&times;</button>
    `;
    cartItemsContainer.appendChild(itemElement);
  });

  if (cartCount) cartCount.innerText = totalCount;
  if (cartTotalPrice) cartTotalPrice.innerText = `$${total.toLocaleString('es-CO')} COP`;
}

// Modificar cantidades (+ / -)
function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

// Eliminar ítems
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

// Escuchador para procesar pago y enviar notificación a WhatsApp
document.addEventListener('DOMContentLoaded', () => {
  const checkoutForm = document.getElementById('checkout-form');

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de realizar el pago.');
        return;
      }

      // Capturar datos de envío y cliente
      const name = document.getElementById('cust-name').value.trim();
      const email = document.getElementById('cust-email').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const city = document.getElementById('cust-city').value.trim();
      const address = document.getElementById('cust-address').value.trim();

      // Número de WhatsApp para recibir la confirmación (57 + 10 dígitos)
      const phoneNumber = '573124376507'; 

      // Generar ID de transacción ficticio para la demostración
      const transactionId = 'MP-TEST-' + Math.floor(100000 + Math.random() * 900000);

      let message = `*¡NUEVO PEDIDO PAGADO (MERCADO PAGO)* 💳\n`;
      message += `*ID Transacción:* ${transactionId}\n\n`;
      message += `👤 *Cliente:* ${name}\n`;
      message += `📧 *Email:* ${email}\n`;
      message += `📞 *Teléfono:* ${phone}\n`;
      message += `📍 *Ciudad:* ${city}\n`;
      message += `🏠 *Dirección:* ${address}\n\n`;
      message += `🛒 *Productos Comprados:*\n`;

      let total = 0;
      cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name} (x${item.quantity}) - $${itemTotal.toLocaleString('es-CO')} COP\n`;
      });

      message += `\n💰 *Total Pagado:* $${total.toLocaleString('es-CO')} COP`;

      // Simular la redirección a la pasarela y confirmación inmediata
      alert(`Redirigiendo a Mercado Pago (Modo Sandbox)\nTransacción Generada: ${transactionId}`);

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    });
  }
});