document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos-container');
    const categoryFilter = document.getElementById('category-filter');
    const sortByPrice = document.getElementById('sort-by-price');
    const availabilityFilter = document.getElementById('availability-filter');
    const searchButton = document.getElementById('search-button');

    function loadProducts() {
        const category = categoryFilter.value;
        const sortBy = sortByPrice.value;
        const availability = availabilityFilter.checked;

        let url = `get_products.php?`;
        if (category) {
            url += `category=${category}&`;
        }
        if (sortBy) {
            url += `sortBy=${sortBy}&`;
        }
        if (availability) {
            url += `availability=true&`;
        }

        fetch(url)
            .then(response => response.json())
            .then(products => {
                productosContainer.innerHTML = '';
                products.forEach(product => {
                    const productCard = `
                        <div class="card">
                            <img src="Images/${product.foto}" alt="${product.nombre}">
                            <h3>${product.nombre}</h3>
                            <p>Precio: ${product.precio}€</p>
                        </div>
                    `;
                    productosContainer.innerHTML += productCard;
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function loadCategories() {
        fetch('get_categories.php')
            .then(response => response.json())
            .then(categories => {
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.categoria;
                    option.textContent = category.categoria;
                    categoryFilter.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    searchButton.addEventListener('click', loadProducts);

    loadProducts();
    loadCategories();

    // Initialize particles.js
    particlesJS.load('particles-js', 'assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
});