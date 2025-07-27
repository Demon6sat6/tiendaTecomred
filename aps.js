// app.js

// --- DOM Elements ---
// Authentication Modals & Buttons
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const forgotPasswordModal = document.getElementById('forgot-password-modal');

const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const btnLogout = document.getElementById('btn-logout');
const userDisplay = document.getElementById('user-display');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');

const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const forgotPasswordMessage = document.getElementById('forgot-password-message');

const goToRegisterLink = document.getElementById('go-to-register');
const goToLoginLink = document.getElementById('go-to-login');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginLink = document.getElementById('back-to-login');

const closeModals = document.querySelectorAll('.cerrar-modal'); // All 'x' buttons on modals

// Shopping Cart Elements
const mostrarCarritoBtn = document.getElementById('mostrar-carrito');
const ocultarCarritoBtn = document.getElementById('ocultar-carrito');
const carritoAside = document.getElementById('carrito');

const listaCarrito = document.getElementById('lista-carrito');
const carritoTotalSpan = document.getElementById('carrito-total');
const btnVaciarCarrito = document.getElementById('btn-vaciar');
const btnIrPago = document.getElementById('btn-ir-pago');
const carritoVacioMensaje = document.getElementById('carrito-vacio-mensaje');

// Product Filters & Display
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroPrecio = document.getElementById('filtro-precio');
const precioMostrar = document.getElementById('precio-mostrar');
const buscadorInput = document.getElementById('buscador');
const btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');
const contenedorProductos = document.getElementById('contenedor-productos');
const noProductosMensaje = document.getElementById('no-productos-mensaje');

// Payment Form Elements
const metodoPagoSelect = document.getElementById('metodo');
const detallesPagoTarjeta = document.getElementById('detalles-pago-tarjeta');
const formPago = document.getElementById('form-pago');
const pagoMensaje = document.getElementById('pago-mensaje');
const pagoError = document.getElementById('pago-error');


// --- Global Variables (Simulated Data using Local Storage) ---
// Load existing users or initialize empty array
let users = JSON.parse(localStorage.getItem('simulatedUsers')) || [];
// Load current user session or set to null
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Hardcoded product data (your "database" for now)
let products = [
    { id: 1, name: 'Laptop Gamer XYZ', category: 'Laptops', price: 1200.00, imageUrl: 'https://via.placeholder.com/150/007bff/ffffff?text=Laptop' },
    { id: 2, name: 'Mouse Inalámbrico RGB', category: 'Accesorios', price: 45.50, imageUrl: 'https://via.placeholder.com/150/28a745/ffffff?text=Mouse' },
    { id: 3, name: 'SSD NVMe 1TB', category: 'Componentes', price: 150.00, imageUrl: 'https://via.placeholder.com/150/ffc107/ffffff?text=SSD' },
    { id: 4, name: 'Router WiFi 6', category: 'Redes', price: 90.00, imageUrl: 'https://via.placeholder.com/150/17a2b8/ffffff?text=Router' },
    { id: 5, name: 'Teclado Mecánico', category: 'Accesorios', price: 80.00, imageUrl: 'https://via.placeholder.com/150/6f42c1/ffffff?text=Teclado' },
    { id: 6, name: 'Monitor Curvo 27"', category: 'Componentes', price: 300.00, imageUrl: 'https://via.placeholder.com/150/dc3545/ffffff?text=Monitor' },
    { id: 7, name: 'Laptop Ultrabook', category: 'Laptops', price: 950.00, imageUrl: 'https://via.placeholder.com/150/fd7e14/ffffff?text=Ultrabook' },
    { id: 8, name: 'Cable Ethernet Cat6', category: 'Redes', price: 10.00, imageUrl: 'https://via.placeholder.com/150/6c757d/ffffff?text=Cable' },
];

// Load cart from local storage or initialize empty array
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// --- Helper Functions ---

/**
 * Displays a message in a specified element.
 * @param {HTMLElement} element - The DOM element to display the message in.
 * @param {string} message - The message text.
 * @param {boolean} isSuccess - True if it's a success message, false for error.
 */
function showMessage(element, message, isSuccess) {
    element.textContent = message;
    element.style.display = 'block';
    element.classList.toggle('mensaje-exito', isSuccess);
    element.classList.toggle('mensaje-error', !isSuccess);
}

/**
 * Hides a message in a specified element.
 * @param {HTMLElement} element - The DOM element to hide the message from.
 */
function hideMessage(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// --- Main Functions ---

/**
 * Opens a modal window.
 * @param {HTMLElement} modalElement - The modal DOM element.
 */
function openModal(modalElement) {
    modalElement.classList.add('visible');
    modalElement.setAttribute('aria-hidden', 'false');
    // Set focus to the first interactive element in the modal for accessibility
    const firstFocusable = modalElement.querySelector('input, button, a, select, textarea');
    if (firstFocusable) {
        firstFocusable.focus();
    }
}

/**
 * Closes a modal window.
 * @param {HTMLElement} modalElement - The modal DOM element.
 */
function closeModal(modalElement) {
    modalElement.classList.remove('visible');
    modalElement.setAttribute('aria-hidden', 'true');
    // Clear messages and forms when closing
    const messageElement = modalElement.querySelector('.auth-message');
    if (messageElement) {
        hideMessage(messageElement);
    }
    const formElement = modalElement.querySelector('form');
    if (formElement) {
        formElement.reset(); // Reset form fields
    }
}

/**
 * Updates the UI elements related to user authentication (login/register/logout buttons).
 */
function updateAuthUI() {
    if (currentUser) {
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        userDisplay.style.display = 'inline';
        btnLogout.style.display = 'inline';
        userDisplay.textContent = `Hola, ${currentUser.email}`;
    } else {
        btnLogin.style.display = 'inline';
        btnRegister.style.display = 'inline';
        userDisplay.style.display = 'none';
        btnLogout.style.display = 'none';
        userDisplay.textContent = '';
    }
}

/**
 * Displays products in the main product container based on a given array.
 * @param {Array} productsToDisplay - An array of product objects to display.
 */
function displayProducts(productsToDisplay) {
    contenedorProductos.innerHTML = ''; // Clear previous products

    if (productsToDisplay.length === 0) {
        noProductosMensaje.style.display = 'block';
    } else {
        noProductosMensaje.style.display = 'none';
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('producto-card');
            productCard.setAttribute('role', 'gridcell'); // For accessibility
            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" />
                <div class="producto-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <div class="producto-precio">S/ ${product.price.toFixed(2)}</div>
                    <button class="btn-primario btn-add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
                </div>
            `;
            contenedorProductos.appendChild(productCard);
        });
    }
}

/**
 * Applies filters (category, price, search term) to the product list and updates display.
 */
function applyFilters() {
    const category = filtroCategoria.value;
    const maxPrice = parseFloat(filtroPrecio.value);
    const searchTerm = buscadorInput.value.toLowerCase();

    let filteredProducts = products.filter(product => {
        const matchesCategory = (category === 'todos' || product.category === category);
        const matchesPrice = (product.price <= maxPrice);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                              product.category.toLowerCase().includes(searchTerm); // Search by name or category
        return matchesCategory && matchesPrice && matchesSearch;
    });

    displayProducts(filteredProducts);
}

/**
 * Updates the shopping cart display in the aside panel.
 */
function updateCartDisplay() {
    listaCarrito.innerHTML = ''; // Clear current cart items
    let total = 0;

    if (cart.length === 0) {
        carritoVacioMensaje.style.display = 'block';
        btnVaciarCarrito.disabled = true;
        btnIrPago.disabled = true;
    } else {
        carritoVacioMensaje.style.display = 'none';
        btnVaciarCarrito.disabled = false;
        btnIrPago.disabled = false;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItemEl = document.createElement('li');
            cartItemEl.classList.add('item-carrito');
            cartItemEl.setAttribute('role', 'listitem'); // For accessibility
            cartItemEl.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" />
                <div class="info-item-carrito">
                    <h4>${item.name}</h4>
                    <p>S/ ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="controles-item-carrito">
                    <button class="btn-cantidad-restar" data-id="${item.id}" aria-label="Disminuir cantidad de ${item.name}">-</button>
                    <span aria-live="polite" aria-atomic="true">${item.quantity}</span>
                    <button class="btn-cantidad-sumar" data-id="${item.id}" aria-label="Aumentar cantidad de ${item.name}">+</button>
                    <button class="btn-eliminar-item" data-id="${item.id}" aria-label="Eliminar ${item.name} del carrito"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            listaCarrito.appendChild(cartItemEl);
        });
    }
    carritoTotalSpan.textContent = `S/ ${total.toFixed(2)}`;
    // Save cart to local storage for persistence
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

/**
 * Adds a product to the cart or increments its quantity if already present.
 * @param {number} productId - The ID of the product to add.
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
    }
}

/**
 * Updates the quantity of an item in the cart.
 * @param {number} productId - The ID of the product.
 * @param {number} change - The amount to change the quantity by (e.g., 1 for increment, -1 for decrement).
 */
function updateItemQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== productId); // Remove if quantity is 0 or less
        }
        updateCartDisplay();
    }
}

/**
 * Removes an item completely from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
function removeItemFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

/**
 * Handles the payment form submission, simulating a payment process.
 */
function handlePaymentSubmission(e) {
    e.preventDefault(); // Prevent default form submission

    hideMessage(pagoMensaje);
    hideMessage(pagoError);

    if (cart.length === 0) {
        showMessage(pagoError, 'Tu carrito está vacío. Añade productos para continuar.', false);
        return;
    }

    const nombre = document.getElementById('nombre-pago').value.trim();
    const email = document.getElementById('email-pago').value.trim();
    const metodo = metodoPagoSelect.value;
    const aceptaTerminos = document.getElementById('acepta-terminos').checked;

    if (!nombre || !email || metodo === '') {
        showMessage(pagoError, 'Por favor, completa todos los campos obligatorios.', false);
        return;
    }

    if (metodo === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numero-tarjeta').value.trim();
        const fechaExpiracion = document.getElementById('fecha-expiracion').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!numeroTarjeta || !fechaExpiracion || !cvv) {
            showMessage(pagoError, 'Por favor, completa todos los detalles de la tarjeta.', false);
            return;
        }
        // Basic card validation (add more robust validation in a real app)
        if (!/^\d{13,19}$/.test(numeroTarjeta.replace(/\s/g, ''))) {
            showMessage(pagoError, 'Número de tarjeta inválido.', false);
            return;
        }
        if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(fechaExpiracion)) {
            showMessage(pagoError, 'Formato de fecha de expiración inválido (MM/AA).', false);
            return;
        }
        if (!/^\d{3,4}$/.test(cvv)) {
            showMessage(pagoError, 'CVV inválido.', false);
            return;
        }
    }

    if (!aceptaTerminos) {
        showMessage(pagoError, 'Debes aceptar los términos y condiciones para continuar.', false);
        return;
    }

    // Simulate payment processing with a delay
    showMessage(pagoMensaje, 'Procesando tu pago...', true); // Show processing message
    setTimeout(() => {
        const paymentSuccessful = Math.random() > 0.1; // 90% chance of success for demo

        if (paymentSuccessful) {
            showMessage(pagoMensaje, `¡Pago de ${carritoTotalSpan.textContent} exitoso! Gracias por tu compra, ${nombre}. Recibirás una confirmación en ${email}.`, true);
            cart = []; // Clear cart after successful payment
            updateCartDisplay();
            formPago.reset(); // Reset payment form fields
            detallesPagoTarjeta.style.display = 'none'; // Hide card details
            // Optional: Scroll to top or show a confirmation page/modal
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            showMessage(pagoError, 'Hubo un error al procesar tu pago. Por favor, inténtalo de nuevo o elige otro método.', false);
        }
    }, 2000); // Simulate 2-second network delay
}


// --- Event Listeners ---

// Header / Auth Buttons
btnLogin.addEventListener('click', () => openModal(loginModal));
btnRegister.addEventListener('click', () => openModal(registerModal));

btnLogout.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser'); // Clear current user from local storage
    console.log('Sesión cerrada correctamente.');
    updateAuthUI(); // Update UI to show login/register buttons
});

// Close Modals (common functionality for 'x' buttons)
closeModals.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal'); // Find the parent modal
        if (modal) {
            closeModal(modal);
        }
    });
});

// Modal Navigation Links
goToRegisterLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    closeModal(loginModal);
    openModal(registerModal);
});

goToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(forgotPasswordModal);
});

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(forgotPasswordModal);
    openModal(loginModal);
});


// Authentication Form Submissions (Simulated Backend)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    hideMessage(loginMessage);

    // Simulate login logic
    const user = users.find(u => u.email === email && u.password === password); // Find user by email and password

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Save current user to local storage
        showMessage(loginMessage, '¡Inicio de sesión exitoso!', true);
        setTimeout(() => {
            closeModal(loginModal);
            updateAuthUI();
        }, 1000); // Close after a short delay
    } else {
        showMessage(loginMessage, 'Correo o contraseña incorrectos.', false);
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    hideMessage(registerMessage);

    // Basic validation
    if (!email || !password) {
        showMessage(registerMessage, 'Por favor, completa todos los campos.', false);
        return;
    }
    if (password.length < 6) { // Minimum password length
        showMessage(registerMessage, 'La contraseña debe tener al menos 6 caracteres.', false);
        return;
    }

    // Simulate registration logic
    const existingUser = users.find(u => u.email === email);

    if (existingUser) {
        showMessage(registerMessage, 'Este correo ya está registrado.', false);
    } else {
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('simulatedUsers', JSON.stringify(users)); // Save updated users array
        showMessage(registerMessage, '¡Registro exitoso! Ya puedes iniciar sesión.', true);
        setTimeout(() => {
            closeModal(registerModal);
            openModal(loginModal); // Automatically go to login modal
        }, 1500);
    }
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();

    hideMessage(forgotPasswordMessage);

    // Simulate password recovery logic
    const userExists = users.some(u => u.email === email); // Check if user exists

    if (userExists) {
        // In a real application, you would send an email with a reset link here.
        showMessage(forgotPasswordMessage, '¡Enlace de recuperación enviado (simulado)! Revisa tu correo.', true);
        setTimeout(() => {
            closeModal(forgotPasswordModal);
            openModal(loginModal); // Go back to login after showing message
        }, 2000);
    } else {
        showMessage(forgotPasswordMessage, 'No se encontró una cuenta con ese correo.', false);
    }
});


// Shopping Cart Toggle (open/close)
mostrarCarritoBtn.addEventListener('click', () => {
    carritoAside.classList.add('abierto');
    carritoAside.classList.remove('cerrado');
    carritoAside.setAttribute('aria-hidden', 'false');
    mostrarCarritoBtn.setAttribute('aria-expanded', 'true');
    mostrarCarritoBtn.classList.add('visible'); // Keep button visible when cart is open
});

ocultarCarritoBtn.addEventListener('click', () => {
    carritoAside.classList.remove('abierto');
    carritoAside.classList.add('cerrado');
    carritoAside.setAttribute('aria-hidden', 'true');
    mostrarCarritoBtn.setAttribute('aria-expanded', 'false');
    mostrarCarritoBtn.classList.remove('visible'); // Hide button when cart is closed
});

// Product Interactions (using event delegation for "Add to Cart" and cart controls)
// This is efficient as it only attaches one listener to the parent container
contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
        // Optional: Provide visual feedback like a brief animation or message
    }
});

listaCarrito.addEventListener('click', (e) => {
    const target = e.target;
    const productId = parseInt(target.dataset.id);

    if (target.classList.contains('btn-cantidad-sumar')) {
        updateItemQuantity(productId, 1);
    } else if (target.classList.contains('btn-cantidad-restar')) {
        updateItemQuantity(productId, -1);
    } else if (target.classList.contains('btn-eliminar-item')) {
        removeItemFromCart(productId);
    }
});

btnVaciarCarrito.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) { // Confirmation dialog
        cart = [];
        updateCartDisplay();
    }
});

btnIrPago.addEventListener('click', () => {
    // Optional: Close cart if it's open
    ocultarCarritoBtn.click();
    // Scroll to the payment section
    document.getElementById('metodo-pago').scrollIntoView({ behavior: 'smooth' });
});

// Filters
filtroCategoria.addEventListener('change', applyFilters);

filtroPrecio.addEventListener('input', () => {
    precioMostrar.textContent = `S/ ${filtroPrecio.value}`; // Update price display in real-time
    applyFilters();
});

buscadorInput.addEventListener('input', applyFilters); // Filter as user types

btnLimpiarFiltros.addEventListener('click', () => {
    filtroCategoria.value = 'todos';
    filtroPrecio.value = '5000'; // Reset to max price
    precioMostrar.textContent = `S/ 5000`;
    buscadorInput.value = '';
    applyFilters(); // Re-apply filters to show all products
});

// Payment Form Interactions
metodoPagoSelect.addEventListener('change', () => {
    if (metodoPagoSelect.value === 'tarjeta') {
        detallesPagoTarjeta.style.display = 'block';
        // Make card fields required when 'tarjeta' is selected
        document.getElementById('numero-tarjeta').setAttribute('required', 'required');
        document.getElementById('fecha-expiracion').setAttribute('required', 'required');
        document.getElementById('cvv').setAttribute('required', 'required');
    } else {
        detallesPagoTarjeta.style.display = 'none';
        // Remove required attribute for other payment methods
        document.getElementById('numero-tarjeta').removeAttribute('required');
        document.getElementById('fecha-expiracion').removeAttribute('required');
        document.getElementById('cvv').removeAttribute('required');
    }
});

formPago.addEventListener('submit', handlePaymentSubmission);


// --- Initial Load / DOMContentLoaded Event ---
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI(); // Set initial authentication state
    displayProducts(products); // Show all products when page loads
    updateCartDisplay(); // Load and display cart from local storage
    precioMostrar.textContent = `S/ ${filtroPrecio.value}`; // Initialize price range display
});