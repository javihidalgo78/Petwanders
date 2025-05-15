	
		let currentSlide = 0;
		const slides = document.querySelectorAll('.slider .slide');
	  
		function showNextSlide() {
		  slides[currentSlide].classList.remove('active');
		  currentSlide = (currentSlide + 1) % slides.length;
		  slides[currentSlide].classList.add('active');
		}
	  
		setInterval(showNextSlide, 8000); // Cambia cada 8 segundos

    // Funcionalidad del slider (código existente)
    document.addEventListener('DOMContentLoaded', function() {
      const slides = document.querySelectorAll('.slider .slide');
      let currentSlide = 0;
      
      function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[n].classList.add('active');
      }
      
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
      }
      
      setInterval(nextSlide, 3000);
    });
    // Funcionalidad del carrito de compras
    document.addEventListener('DOMContentLoaded', function() {
      // Elementos del DOM
      const cartIcon = document.getElementById('cart-icon');
      const cartContainer = document.getElementById('cart-container');
      const closeCart = document.getElementById('close-cart');
      const backdrop = document.getElementById('backdrop');
      const cartItems = document.getElementById('cart-items');
      const cartCount = document.getElementById('cart-count');
      const cartTotal = document.getElementById('cart-total');
      const checkoutBtn = document.getElementById('checkout-btn');
      const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
      const showProduct = document.querySelectorAll('.show-product');
      
      // Carrito de compras
      let cart = [];
      
      // Cargar carrito desde localStorage
      function loadCart() {
        const savedCart = localStorage.getItem('petwandersCart');
        if (savedCart) {
          cart = JSON.parse(savedCart);
          updateCartUI();
        }
      }
      
      // Guardar carrito en localStorage
      function saveCart() {
        localStorage.setItem('petwandersCart', JSON.stringify(cart));
      }
      
      // Actualizar la interfaz del carrito
      function updateCartUI() {
        // Actualizar contador
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Limpiar carrito actual
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
          cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
          cartTotal.textContent = 'Total: 0.00€';
          return;
        }
        
        // Calcular total
        let total = 0;
        
        // Añadir elementos al carrito
        cart.forEach((item, index) => {
          total += item.price * item.quantity;
          
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
              <div class="item-title">${item.name}</div>
              <div class="item-size">Talla: ${item.size}</div>
              <div class="item-price">${item.price.toFixed(2)}€</div>
              <div class="item-actions">
                <div class="quantity-control">
                  <button class="quantity-btn decrease" data-index="${index}">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          `;
          
          cartItems.appendChild(cartItem);
        });
        
        // Actualizar total
        cartTotal.textContent = `Total: ${total.toFixed(2)}€`;
        
        // Añadir controladores de eventos para los botones
        document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
          btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            decreaseQuantity(index);
          });
        });
        
        document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
          btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            increaseQuantity(index);
          });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            removeItem(index);
          });
        });
      }
      
      // Añadir producto al carrito
      function addToCart(productId, productName, productPrice, productImage, productSize) {
        // Buscar si el producto ya está en el carrito con la misma talla
        const existingItemIndex = cart.findIndex(item => 
          item.id === productId && item.size === productSize
        );
        
        if (existingItemIndex !== -1) {
          // Incrementar cantidad si ya existe el mismo producto con la misma talla
          cart[existingItemIndex].quantity += 1;
        } else {
          // Añadir nuevo producto
          cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            size: productSize,
            quantity: 1
          });
        }
        
        // Actualizar UI y guardar
        updateCartUI();
        saveCart();
        
        // Mostrar carrito
        showCart();
      }
      
      // Aumentar cantidad
      function increaseQuantity(index) {
        cart[index].quantity += 1;
        updateCartUI();
        saveCart();
      }
      
      // Disminuir cantidad
      function decreaseQuantity(index) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          removeItem(index);
        }
        updateCartUI();
        saveCart();
      }
      
      // Eliminar producto
      function removeItem(index) {
        cart.splice(index, 1);
        updateCartUI();
        saveCart();
      }
      
      // Mostrar carrito
      function showCart() {
        cartContainer.classList.add('active');
        backdrop.classList.add('active');
      }
      
      // Ocultar carrito
      function hideCart() {
        cartContainer.classList.remove('active');
        backdrop.classList.remove('active');
      }
      
      // Event Listeners
      cartIcon.addEventListener('click', showCart);
      closeCart.addEventListener('click', hideCart);
      backdrop.addEventListener('click', hideCart);
      
      // Event Listeners para botones "Añadir al Carrito"
      addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
          const productId = this.dataset.productId;
          const productName = this.dataset.productName;
          const productPrice = parseFloat(this.dataset.productPrice);
          const productImage = this.dataset.productImg;
          
          // Obtener talla seleccionada
          const sizeSelect = document.querySelector(`.size-select[data-product-id="${productId}"]`);
          const productSize = sizeSelect.value;
          
          if (!productSize) {
            alert('Por favor, selecciona una talla/capacidad');
            return;
          }
          
          addToCart(productId, productName, productPrice, productImage, productSize);
        });
      });

      
      // Función para finalizar compra
      checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
          alert('Tu carrito está vacío');
          return;
        }
        
        alert('¡Gracias por tu compra! Procesando pedido...');
        cart = [];
        updateCartUI();
        saveCart();
        hideCart();
      });
      
      // Cargar carrito al iniciar
      loadCart();
    });


const productos = [
  {
    id: "harness-mokka",
    nombre: "Mokka",
    descripcion: "Haz click en la imagen para más información",
    precio: 29.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness.JPEG",
    amazonUrl: "https://www.amazon.com/arnéspetshop/id12345",
    features: `• Material resistente y transpirable. 
• Ajuste ergonómico para mayor comodidad.
• Tecnología anti-tirones. 
• Fácil de poner y quitar. 
• Diseñado para evitar rozaduras. 
• Estilo único inspirado en patrones étnicos.`
  },
  {
    id: "harness-chocolate",
    nombre: "Chocolate",
    descripcion: "Haz click en la imagen para más información",
    precio: 32.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness2.JPEG",
    amazonUrl: "https://www.amazon.com/arnéspetshop/id12345",
    features: `• Tela acolchada de alta calidad. 
• Hebillas de liberación rápida. 
• Revestimiento antiolor. 
• Diseño elegante y sofisticado. 
• Material ecológico certificado. 
• Costuras reforzadas.`
  },
  {
    id: "harness-electric",
    nombre: "Electric",
    descripcion: "Haz click en la imagen para más información",
    precio: 34.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness4.JPEG",
    amazonUrl: "https://www.amazon.com/arnéspetshop/id12345",
    features: `• Colores reflectantes para visibilidad nocturna. 
• Malla transpirable para climas cálidos. 
• Cierre de seguridad triple. 
• Libre de sustancias tóxicas. 
• Ajuste anatómico. 
• Producto vegano.`
  },
  {
    id: "white-fountain",
    nombre: "White Fountain",
    descripcion: "Haz click en la imagen para más información",
    precio: 42.50,
    capacidades: ["2L", "3L"],
    imagen: "Images/Fuenteblanca.JPEG",
    amazonUrl: "https://amzn.eu/d/ffLMFYJ",
    features: `• Sistema de triple filtrado de carbón activo. 
• Silenciosa y eficiente. 
• Fácil de desmontar y limpiar. 
• Plástico libre de BPA. 
• Promueve hidratación saludable. 
• Consumo energético bajo.`
  },
  {
    id: "green-fountain",
    nombre: "Green Fountain",
    descripcion: "Haz click en la imagen para más información",
    precio: 42.50,
    capacidades: ["2L", "3L"],
    imagen: "Images/Fuenteverde.JPEG",
    amazonUrl: "https://amzn.eu/d/ffLMFYJ",
    features: `• Filtro reemplazable ecológico. 
• Diseño moderno en color verde. 
• Motor ultra silencioso. 
• Antideslizante y estable. 
• Ideal para gatos y perros pequeños. 
• Ahorro energético automático.`
  },
  {
    id: "auto-feeder",
    nombre: "Automatic Feeder",
    descripcion: "Haz click en la imagen para más información",
    precio: 59.99,
    capacidades: ["3L", "5L"],
    imagen: "Images/Petfeeder.JPEG",
    amazonUrl: "https://amzn.eu/d/g9I4pBq",
    features: `• Programación de horarios de comida. 
• Pantalla digital intuitiva. 
• Control por aplicación móvil. 
• Contenedor hermético para preservar frescura. 
• Fácil recarga y limpieza. 
• Fabricado con materiales duraderos y reciclables.`
  },
  {
    id: "correas",
    nombre: "Correas",
    descripcion: "Haz click en la imagen para más información",
    precio: 12.99,
    colores: ["Azul", "Verde", "Naranja", "Morado", "Negro"],
    imagen: "images/Leashes.JPEG",
    amazonUrl: "https://amzn.eu/d/g9I4pBq",
    features: `• Nylon reforzado de alta resistencia. 
• Mosquetón de acero inoxidable. 
• Colores resistentes al sol. 
• Longitud ajustable. 
• Fácil de lavar. 
• Compatibles con cualquier arnés.`
  },
  {
    id: "arenero",
    nombre: "Arenero Autolimpiable",
    descripcion: "Haz click en la imagen para más información",
    precio: 249.99,
    capacidades: ["90 litros"],
    imagen: "images/Catlitterbox.JPEG",
    amazonUrl: "https://amzn.eu/d/1Tm9dYD",
    features: `• Tecnología de auto-limpieza inteligente. 
• Control de olores con filtro de carbono. 
• Material antibacteriano. 
• Bandeja extraíble para fácil limpieza. 
• Bajo consumo eléctrico. 
• Apto para gatos grandes.`
  },
  {
    id: "waterfeeder",
    nombre: "Fuente de agua y Comedero",
    descripcion: "Haz click en la imagen para más información",
    precio: 79.99,
    capacidades: ["6L + 3L"],
    imagen: "images/Waterfeeder2in1.JPEG",
    amazonUrl: "https://amzn.eu/d/g9I4pBq",
    features: `• Combinación de bebedero y comedero. 
• Material de grado alimenticio libre de BPA. 
• Filtro de agua reemplazable. 
• Fácil recarga superior. 
• Diseño compacto y elegante. 
• Autonomía de hasta 15 días.`
  },
  {
    id: "petbowl",
    nombre: "Comedero Bebedero de viaje",
    descripcion: "Haz click en la imagen para más información",
    precio: 19.99,
    capacidades: ["6L + 3L"],
    imagen: "images/dogbowl.jpg",
    amazonUrl: "https://amzn.eu/d/1BeI0St",
    features: `• Combinación de bebedero y comedero. 
• Material de grado alimenticio libre de BPA. 
• Ideal para excussiones y viajes. 
• Asa de transporte. 
• Diseño compacto y elegante. 
• Capacidad de 1 litro para comida y 0.8 litros de agua.`
  }
];



const contenedor = document.getElementById('productos-container');

productos.forEach(producto => {
  displayProduct(producto)
});

function displayProduct(producto){
  let opciones = [];
  let tipoSelect = "";
  
  if (producto.tallas) {
    opciones = producto.tallas;
    tipoSelect = "talla";
  } else if (producto.capacidades) {
    opciones = producto.capacidades;
    tipoSelect = "capacidad";
  } else if (producto.colores) {
    opciones = producto.colores;
    tipoSelect = "color";
  }
  
  const opcionesHTML = opciones.map(opcion =>
    `<option value="${opcion}">${opcion}</option>`
  ).join("");

  const amazonUrl = producto.amazonUrl || "https://www.amazon.com/s?k=" + encodeURIComponent(producto.nombre);


  const cardHTML = `
    <div class="card">
    <a 
      data-product-id="${producto.id}"
      data-product-name="${producto.nombre}"
      data-product-price="${producto.precio}"
      data-product-img="${producto.imagen}"
     class="show-product">
    <img src="${producto.imagen}" alt="${producto.nombre}">
    </a>
      
      <div>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="buy-options">
          <select class="size-select" data-product-id="${producto.id}">
            <option value="">Seleccionar ${tipoSelect}</option>
            ${opcionesHTML}
          </select>
          <button
            class="add-to-cart-btn"
            data-product-id="${producto.id}"
            data-product-name="${producto.nombre}"
            data-product-price="${producto.precio}"
            data-product-img="${producto.imagen}">
            Añadir al Carrito - ${producto.precio.toFixed(2)}€
          </button>
        </div>
        <div class="amazon-link">
          <a href="${amazonUrl}" target="_blank" rel="noopener noreferrer">
            <img src="images/amazon-icon.png" alt="Comprar en Amazon" title="Comprar en Amazon" class="amazon-icon">
          </a>
        </div>
      </div>
    </div>
  `;

  contenedor.innerHTML += cardHTML;
}

// Elementos del producto en la modal
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalPrice = document.getElementById('modal-price');
  const modalOptions = document.getElementById('modal-options');
  const modalFeatures = document.getElementById('modal-features')
  const closeModalBtn = document.querySelector('.close-modal');

  // Abrir modal al hacer clic en imagen
  document.querySelectorAll('.show-product').forEach(enlace => {
    enlace.addEventListener('click', function () {
      const productId = this.dataset.productId;
      const producto = productos.find(p => p.id === productId);

      if (!producto) return;

      modalTitle.textContent = producto.nombre;
      modalImage.src = producto.imagen;
      modalImage.alt = producto.nombre;
      modalDescription.textContent = producto.descripcion;
      modalPrice.textContent = `Precio: ${producto.precio.toFixed(2)}€`;
//modalFeatures. innerHTML = producto.features.map(feature => `<li>${feature}</li>`).join('');
      modalFeatures.innerHTML = convertirFeaturesALista(producto.features);

      let opcionesTexto = '';
      if (producto.tallas) {
        opcionesTexto = 'Tallas disponibles: ' + producto.tallas.join(', ');
      } else if (producto.capacidades) {
        opcionesTexto = 'Capacidades disponibles: ' + producto.capacidades.join(', ');
      } else if (producto.colores) {
        opcionesTexto = 'Colores disponibles: ' + producto.colores.join(', ');
      }
      modalOptions.textContent = opcionesTexto;

      modal.style.display = 'flex';
      
    });
  });

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});



// Función para abrir el modal con los datos del producto
//  function abrirModal(producto) {

//    document.getElementById("modal-title").textContent = producto.nombre;
//    document.getElementById("modal-image").src = producto.imagen;
//    document.getElementById("modal-price").textContent = `Precio: $${producto.precio.toFixed(2)}`;


//    // Mostrar opciones si existen (tallas, capacidades o colores)
//    const opciones =
//      producto.tallas?.length ? `Tallas: ${producto.tallas.join(", ")}` :
//      producto.capacidades?.length ? `Capacidades: ${producto.capacidades.join(", ")}` :
//      producto.colores?.length ? `Colores: ${producto.colores.join(", ")}` :     "";
//    document.getElementById("modal-options").textContent = opciones;

//    // Mostrar características con viñetas
//    document.getElementById("modal-features").innerHTML = convertirFeaturesALista(producto.features);

//    // Mostrar el modal
//   document.getElementById("product-modal").style.display = "block";
//  }

// Función para cerrar el modal
document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("product-modal").style.display = "none";
});

// También puedes cerrar el modal haciendo clic fuera del contenido
window.addEventListener("click", function(event) {
  const modal = document.getElementById("product-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


// Función para convertir el texto de características en una lista HTML
function convertirFeaturesALista(featuresTexto) {
  return `<ul style="padding-left: 1.2em; margin-top: 0.5em;">${
    featuresTexto
      .split(/\r?\n/)
      .filter(linea => linea.trim().startsWith("•"))
      .map(linea => `<li>${linea.replace(/^•\s*/, "")}</li>`)
      .join("")
  }</ul>`;
}

// Función para abrir la modal con mejor manejo en móviles
// function openModal(product) {
//   // Deshabilitar scroll del body
//   document.body.style.overflow = 'hidden';
//   document.body.style.position = 'fixed';
//   document.body.style.width = '100%';
  
//   // Configurar contenido
//   modalTitle.textContent = product.nombre;
//   modalImage.src = product.imagen;
//   modalImage.alt = product.nombre;
//   // modalDescription.textContent = product.descripcion;
//   modalPrice.textContent = `Precio: $${product.precio.toFixed(2)}`;
  
//   // Opciones disponibles
//   if (product.tallas) {
//     modalOptions.textContent = `Tallas: ${product.tallas.join(', ')}`;
//   } else if (product.colores) {
//     modalOptions.textContent = `Colores: ${product.colores.join(', ')}`;
//   } else if (product.capacidades) {
//     modalOptions.textContent = `Capacidades: ${product.capacidades.join(', ')}`;
//   } else {
//     modalOptions.textContent = '';
//   }
  
//   // Lista de características
//   featuresList.innerHTML = '';
//   product.features.forEach(feature => {
//     const li = document.createElement('li');
//     li.textContent = feature;
//     featuresList.appendChild(li);
//   });
  
//   // Mostrar modal
//   modal.style.display = 'flex';
  
//   // Enfocar la modal para mejor accesibilidad
//   modal.focus();
// }

// Función para cerrar la modal
// function closeModal() {
//   modal.style.display = 'none';
//   // Restaurar scroll del body
//   document.body.style.overflow = '';
//   document.body.style.position = '';
//   document.body.style.width = '';
// }

// Event listeners mejorados para móviles
// closeModalBtn.addEventListener('click', closeModal);

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeModal();
//   }
// });

// // Cerrar con tecla ESC
// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     closeModal();
//   }
// });

const modalAddToCartBtn = document.getElementById('modal-add-to-cart');

// Evento para añadir al carrito desde el modal
modalAddToCartBtn.addEventListener('click', () => {
  const selectedOption = modalSelect.value;
  if (!selectedOption) {
    alert('Por favor selecciona una opción antes de añadir al carrito.');
    return;
  }

  // Puedes personalizar este objeto según cómo manejes el carrito
  const producto = productos.find(p => p.nombre === modalTitle.textContent);

  const itemCarrito = {
    id: producto.id,
    nombre: producto.nombre,
    opcion: selectedOption,
    precio: producto.precio,
    cantidad: 1
  };

  // Aquí llamas a tu función para añadir al carrito
  agregarAlCarrito(itemCarrito);

  alert(`${producto.nombre} (${selectedOption}) añadido al carrito.`);
  modal.style.display = 'none';
});

const carrito = [];

function agregarAlCarrito(item) {
  const existente = carrito.find(p => p.id === item.id && p.opcion === item.opcion);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push(item);
  }
  console.log("Carrito actualizado:", carrito);
}

