document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');

    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');

    const closeLoginModal = document.getElementById('close-login-modal');
    const closeRegisterModal = document.getElementById('close-register-modal');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Mostrar/ocultar botones según el estado de la sesión
    if (sessionStorage.getItem('usuario_logueado')) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }

    // Abrir modales
    // Abrir modales
    loginBtn.addEventListener('click', () => { loginModal.style.display = 'block'; });
    registerBtn.addEventListener('click', () => { registerModal.style.display = 'block'; });

    // Cerrar modales
    closeLoginModal.addEventListener('click', () => { loginModal.style.display = 'none'; });
    closeRegisterModal.addEventListener('click', () => { registerModal.style.display = 'none'; });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Envío del formulario de registro
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);

        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                registerModal.style.display = 'none';
                loginModal.style.display = 'block';
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});