// ==========================================
// ESTADO Y LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

let cart = [];
const PHONE_NUMBER = "573000000000"; // Sustituye por tu número de WhatsApp real con código de país (ej. 57 para Colombia)

// Elementos del DOM
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('#cartModal');
const cartCloseBtn = document.querySelector('.cart-close-btn');
const cartOverlay = document.querySelector('.cart-overlay');
const cartCount = document.querySelector('.cart-count');
const cartBody = document.querySelector('.cart-body');
const cartTotalPrice = document.querySelector('#cartTotalPrice');
const checkoutBtn = document.querySelector('#checkoutBtn');

// 1. Abrir y Cerrar Modal del Carrito
function toggleCart() {
  if (cartModal) {
    cartModal.classList.toggle('active');
  }
}

if (cartBtn) cartBtn.addEventListener('click', toggleCart);
if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCart);
if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

// 2. Agregar Producto al Carrito
function addToCart(name, price, img) {
  const existingIndex = cart.findIndex(item => item.name === name);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ name, price, img, quantity: 1 });
  }

  updateCartUI();
  
  // Abrir carrito automáticamente al agregar (opcional)
  if (!cartModal.classList.contains('active')) {
    toggleCart();
  }
}

// 3. Eliminar Producto del Carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// 4. Actualizar Interfaz (UI) y Total
function updateCartUI() {
  // Actualizar Contador del Header
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;

  // Renderizar Items en el Panel Lateral
  if (cartBody) {
    if (cart.length === 0) {
      cartBody.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 40px;">El carrito está vacío</p>';
    } else {
      cartBody.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price.toLocaleString('es-CO')} x ${item.quantity}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${index})">&times;</button>
        </div>
      `).join('');
    }
  }

  // Calcular Total
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (cartTotalPrice) {
    cartTotalPrice.textContent = `$${total.toLocaleString('es-CO')}`;
  }
}

// 5. Enviar Pedido a WhatsApp
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let message = "👋 *¡Hola! Quisiera realizar el siguiente pedido:*\n\n";
    
    cart.forEach(item => {
      message += `• *${item.name}* (${item.quantity}x) - $${(item.price * item.quantity).toLocaleString('es-CO')}\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n💰 *Total Estimado:* $${total.toLocaleString('es-CO')}\n`;
    message += "📍 *Quedo atento para coordinar el pago y el envío.*";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  });
}

// 6. Asignar Eventos a los Botones "COMPRAR" / "AÑADIR"
document.addEventListener('DOMContentLoaded', () => {
  const buyButtons = document.querySelectorAll('.btn-buy');

  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      
      if (card) {
        const name = card.querySelector('.product-name')?.textContent.trim() || 'Producto';
        const priceText = card.querySelector('.product-price')?.textContent.replace(/[^0-9]/g, '') || '0';
        const price = parseInt(priceText, 10);
        const img = card.querySelector('.product-image-box img')?.src || '';

        addToCart(name, price, img);
      }
    });
  });
});