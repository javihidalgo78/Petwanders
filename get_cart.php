<?php
session_start();
require_once 'config/database.php';

if (isset($_SESSION['usuario_id'])) {
    $usuario_id = $_SESSION['usuario_id'];

    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die(json_encode([]));
    }

    $sql = "SELECT producto_id, cantidad FROM carrito WHERE usuario_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $carrito = [];
    while ($row = $result->fetch_assoc()) {
        $carrito[] = $row;
    }

    echo json_encode($carrito);

    $stmt->close();
    $conn->close();
} else {
    echo json_encode([]);
}
?>