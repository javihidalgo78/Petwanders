document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');

    // Lógica para mostrar el botón de logout si el usuario está logueado
    if (sessionStorage.getItem('usuario_logueado')) {
        logoutBtn.style.display = 'block';
    }

    logoutBtn.addEventListener('click', function() {
        // Eliminar la bandera de la sesión
        sessionStorage.removeItem('usuario_logueado');
        // Redirigir a la página de inicio
        window.location.href = 'index.html';
    });
});