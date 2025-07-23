<?php
session_start();
require_once 'config/database.php';

if (isset($_SESSION['usuario_id']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario_id = $_SESSION['usuario_id'];
    $producto_id = $_POST['producto_id'];
    $cantidad = $_POST['cantidad'];

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos']));
    }

    // Verificar si el producto ya está en el carrito
    $sql = "SELECT * FROM carrito WHERE usuario_id = ? AND producto_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $usuario_id, $producto_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Actualizar cantidad
        $sql = "UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('iis', $cantidad, $usuario_id, $producto_id);
    } else {
        // Insertar nuevo producto
        $sql = "INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('isi', $usuario_id, $producto_id, $cantidad);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Producto añadido al carrito']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al añadir el producto al carrito']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}
?>