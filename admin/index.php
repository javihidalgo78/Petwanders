<?php
session_start();

// Verificar si el usuario está logueado y es un administrador
if (!isset($_SESSION['logueado']) || $_SESSION['rol'] !== 'admin') {
    header("Location: login.php");
    exit();
}

// Generar un token CSRF si no existe
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control</title>
    <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Panel de Control de la Tienda</h1>
            <div>
                <span>Bienvenido, <?php echo htmlspecialchars($_SESSION['usuario_nombre']); ?></span>
                <a href="logout.php" class="btn-logout">Cerrar Sesión</a>
            </div>
        </header>

        <?php
        if (isset($_SESSION['mensaje'])) {
            echo '<div class="mensaje">' . htmlspecialchars($_SESSION['mensaje'], ENT_QUOTES, 'UTF-8') . '</div>';
            unset($_SESSION['mensaje']);
        }
        ?>

        <div class="panelCrear">
            <button id="crear" class="btn-crear">Crear Nuevo Producto</button>
        </div>

        <!-- Formulario de creación de productos -->
        <form action="process_upload.php" method="POST" enctype="multipart/form-data" id="product-form">
            <h2>☘️ Nuevo Producto</h2>
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>

            <div class="form-group">
                <label for="descripcion">Descripción</label>
                <textarea name="descripcion" id="descripcion" rows="6" placeholder="Escribe la descripción del producto." required></textarea>
            </div>

            <div class="form-group">
                <label for="precio">Precio</label>
                <input type="number" step="0.01" id="precio" name="precio" required>
            </div>

            <div class="form-group">
                <label for="categoria">Categoría</label>
                <input type="text" id="categoria" name="categoria" required>
            </div>

            <div class="form-group">
                <label for="foto">Foto</label>
                <input type="file" id="foto" name="foto" accept="image/*" required>
            </div>

            <button type="submit" name="submit">Guardar Producto</button>
        </form>
    </div>

    <script>
        // Script para mostrar/ocultar el formulario
        document.getElementById('crear').addEventListener('click', function() {
            var form = document.getElementById('product-form');
            if (form.style.display === 'none' || form.style.display === '') {
                form.style.display = 'block';
            } else {
                form.style.display = 'none';
            }
        });
    </script>
</body>
</html>