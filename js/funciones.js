	
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
    descripcion: "Nuestro diseño étnico personalizado.",
    precio: 29.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness.JPEG"
  },
  {
    id: "harness-chocolate",
    nombre: "Chocolate",
    descripcion: "Elegante y con estilo propio.",
    precio: 32.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness2.JPEG"
  },
  {
    id: "harness-electric",
    nombre: "Electric",
    descripcion: "Colores vibrantes para destacar.",
    precio: 34.99,
    tallas: ["XS", "S", "M", "L"],
    imagen: "images/Harness4.JPEG"
  },
  {
    id: "white-fountain",
    nombre: "White Fountain",
    descripcion: "Fuente de agua con filtro purificador.",
    precio: 42.50,
    capacidades: ["2L", "3L"],
    imagen: "Images/Fuenteblanca.JPEG"
  },
  {
    id: "green-fountain",
    nombre: "Green Fountain",
    descripcion: "Fuente de agua con filtro purificador.",
    precio: 42.50,
    capacidades: ["2L", "3L"],
    imagen: "Images/Fuenteverde.JPEG"
  },
  {
    id: "auto-feeder",
    nombre: "Automatic Feeder",
    descripcion: "Comedero automático para mascotas.",
    precio: 59.99,
    capacidades: ["3L", "5L"],
    imagen: "Images/Petfeeder.JPEG"
  }
];

const contenedor = document.getElementById('productos-container');

  productos.forEach(producto => {
    const opciones = (producto.tallas || producto.capacidades || []).map(talla =>
      `<option value="${talla}">${talla}</option>`
    ).join("");

    const tipoSelect = producto.tallas ? "talla" : "capacidad";

    const cardHTML = `
      <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <div class="buy-options">
            <select class="size-select" data-product-id="${producto.id}">
              <option value="">Seleccionar ${tipoSelect}</option>
              ${opciones}
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
        </div>
      </div>
    `;

    contenedor.innerHTML += cardHTML;
  });
