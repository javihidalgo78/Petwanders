document.getElementById('cerrarSesion').addEventListener('click', () => {
    const confirmado = confirm("¿Seguro que deseas cerrar la sesión?");
    if (confirmado){
        fetch('logout.php', {
           method: 'POST' 
        })
        .then(() => {
            window.location.href = 'login.php'
        })
    }
})