/**
 * CATÁLOGO DE PRODUCTOS - OSIRIS
 */
const PRODUCTOS_OSIRIS = [
  {
    id: 1,
    nombre: "Gorra Osiris Model 1",
    categoria: "Gorras",
    precio: 120000,
    etiqueta: "BESTSELLER",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 1.jpg"
  },
  {
    id: 2,
    nombre: "Gorra Osiris Model 2",
    categoria: "Gorras",
    precio: 120000,
    etiqueta: "NEW DROP",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 2.jpg"
  },
  {
    id: 3,
    nombre: "Gorra Osiris Model 3",
    categoria: "Gorras",
    precio: 120000,
    etiqueta: "EXCLUSIVA",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 3.jpg"
  },
  {
    id: 4,
    nombre: "Gorra Osiris Model 4",
    categoria: "Gorras",
    precio: 120000,
    etiqueta: "LIMITED",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 4.jpg"
  },
  {
    id: 5,
    nombre: "Gorra Osiris Model 5",
    categoria: "Gorras",
    precio: 125000,
    etiqueta: "EDICIÓN ESPECIAL",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 5.jpg"
  },
  {
    id: 6,
    nombre: "Gorra Osiris Model 6",
    categoria: "Gorras",
    precio: 125000,
    etiqueta: "POPULAR",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 6.jpg"
  },
  {
    id: 7,
    nombre: "Gorra Osiris Model 7",
    categoria: "Gorras",
    precio: 130000,
    etiqueta: "STREETWEAR",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 7.jpg"
  },
  {
    id: 8,
    nombre: "Gorra Osiris Model 8",
    categoria: "Gorras",
    precio: 130000,
    etiqueta: "EDICIÓN LIMITADA",
    tallas: ["ÚNICA"],
    imagen: "img/gorra 8.jpg"
  }
  
];
// Dentro de tu archivo js/productos.js

function renderProducts(productsList) {
  const container = document.getElementById("products-container"); // o tu contenedor de productos
  container.innerHTML = "";

  productsList.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    // AQUÍ AGREGAS LA ESTRUCTURA HTML DE LA TARJETA
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      
      <div class="product-footer">
        <span class="price">$${product.price.toLocaleString()} COP</span>
        
        <div class="card-actions">
          <!-- Botón de compra directa o ver detalle -->
          <button class="btn-buy" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">COMPRAR</button>
          
          <!-- Botón de icono para agregar al carrito -->
          <button class="btn-add-cart" onclick="addToCart('${product.id}', '${product.name}', ${product.price})" aria-label="Agregar al carrito">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}