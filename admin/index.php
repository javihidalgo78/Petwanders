<?php
//Comprobar si el usuario está logueado

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
if(!isset($_SESSION['logueado']) && !$_SESSION['logueado']) {
    header("Location: login.php");
    exit();
}
if(isset($_SESSION['mensaje'])) {
    echo '<div>' .$_SESSION['mensaje'].'</div>';
    unset($_SESSION['mensaje']);
}
echo '<button id="cerrarSesion">Cerrar sesión</button>';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de control</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

<div class="container">
    <h1>Panel de control de la Tienda</h1>
    <!-- Panel de creación -->
    <div class="panelCrear">
        <button id="crear" class="btn-crear">Crear nuevo producto</button>
    </div>

    <!-- Formulario de creación de productos -->
    <form method="POST" enctype="multipart/form-data">
        <h2>☘️ Nuevo Producto</h2>

        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <small class="error" id="error-nombre"></small>
        </div>

        <div class="form-group">
            <label for="categoria">Categoría</label>
            <input type="text" id="categoria" name="categoria" required>
            <small class="error" id="error-categoria"></small>
        </div>

        <div class="form-group">
            <label for="talla">Talla</label>
            <input type="text" id="talla" name="talla">
        </div>

        <div class="checkbox-group">
            <input type="checkbox" id="disponible" name="disponible">
            <label for="disponible">Disponible</label>
        </div>

        <div class="form-group">
            <label for="foto">Foto</label>
            <input type="file" id="foto" name="foto" accept="image/*">
            <small class="error" id="error-foto"></small>
        </div>

        <div class="form-group">
            <label for="amazonUrl">Link a Amazon</label>
            <input type="amazonUrl" id="amazonUrl" name="amazonUrl" required>
            <small class="error" id="error-amazonUrl"></small>
        </div>

        <div class="form-group">
            <label for="caracteristicas">Características</label>
            <textarea name="características" id="características" rows="6" placeholder="Escribe las características del producto."></textarea>
            <small class="error" id="error-caracteristicas"></small>
        </div>

        <button type="submit" id="btnGuardar">Guardar libro</button>
    </form>
    <script src="js/funciones2.js"></script>
<script src="js/sesiones.js"></script>
</body>
</html>