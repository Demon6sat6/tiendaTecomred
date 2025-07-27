// Get references to all the necessary elements
const loginBtn = document.getElementById('btn-login');
const registerBtn = document.getElementById('btn-register');
const logoutBtn = document.getElementById('btn-logout');
const userDisplay = document.getElementById('user-display');

const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const forgotPasswordModal = document.getElementById('forgot-password-modal');

const closeLoginModalBtn = loginModal.querySelector('.cerrar-modal');
const closeRegisterModalBtn = registerModal.querySelector('.cerrar-modal');
const closeForgotPasswordModalBtn = forgotPasswordModal.querySelector('.cerrar-modal');

const goToRegisterLink = document.getElementById('go-to-register');
const goToLoginLink = document.getElementById('go-to-login');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginLink = document.getElementById('back-to-login');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');

const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');
const forgotPasswordMessage = document.getElementById('forgot-password-message');

// Function to open a specific modal
function openModal(modal) {
    // Hide all modals first
    loginModal.style.display = 'none';
    registerModal.style.display = 'none';
    forgotPasswordModal.style.display = 'none';

    // Show the target modal
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false'); // Make it accessible
}

// Function to close any open modal
function closeModal(modal) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true'); // Hide it from accessibility tree
    // Clear any messages when closing
    loginMessage.textContent = '';
    registerMessage.textContent = '';
    forgotPasswordMessage.textContent = '';
    // Optionally clear form fields
    if (modal === loginModal) loginForm.reset();
    if (modal === registerModal) registerForm.reset();
    if (modal === forgotPasswordModal) forgotPasswordForm.reset();
}

// Event Listeners for opening modals
loginBtn.addEventListener('click', () => openModal(loginModal));
registerBtn.addEventListener('click', () => openModal(registerModal));

// Event Listeners for closing modals
closeLoginModalBtn.addEventListener('click', () => closeModal(loginModal));
closeRegisterModalBtn.addEventListener('click', () => closeModal(registerModal));
closeForgotPasswordModalBtn.addEventListener('click', () => closeModal(forgotPasswordModal));

// Event listeners for switching between modals
goToRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(registerModal);
});

goToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(forgotPasswordModal);
});

backToLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(loginModal);
});

// Basic form submission handlers (for demonstration purposes)
// In a real application, you would send this data to a server.

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simulate a login process
    if (email === 'test@example.com' && password === 'password123') {
        loginMessage.textContent = '¡Inicio de sesión exitoso!';
        loginMessage.style.color = 'green';
        setTimeout(() => {
            closeModal(loginModal);
            // Simulate user logged in state
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            userDisplay.textContent = `Hola, ${email}`;
            userDisplay.style.display = 'inline';
            logoutBtn.style.display = 'inline';
        }, 1500);
    } else {
        loginMessage.textContent = 'Correo o contraseña incorrectos.';
        loginMessage.style.color = 'red';
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Simulate registration
    registerMessage.textContent = `Usuario ${email} registrado exitosamente.`;
    registerMessage.style.color = 'green';
    setTimeout(() => {
        closeModal(registerModal);
        openModal(loginModal); // Redirect to login after registration
    }, 2000);
});

forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;

    // Simulate sending reset link
    forgotPasswordMessage.textContent = `Se ha enviado un enlace de recuperación a ${email}.`;
    forgotPasswordMessage.style.color = 'green';
    setTimeout(() => {
        closeModal(forgotPasswordModal);
        openModal(loginModal); // Redirect to login after sending link
    }, 2000);
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    // Simulate logging out
    userDisplay.style.display = 'none';
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline';
    registerBtn.style.display = 'inline';
    userDisplay.textContent = ''; // Clear user display
    alert('Has cerrado sesión.');
});

// Close modals if clicked outside (optional, but good for UX)
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        closeModal(loginModal);
    }
    if (event.target === registerModal) {
        closeModal(registerModal);
    }
    if (event.target === forgotPasswordModal) {
        closeModal(forgotPasswordModal);
    }
});
