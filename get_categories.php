<?php
require_once 'config/database.php';

$database = new Database();
$conexion = $database->getConexion();

$sql = "SELECT DISTINCT categoria FROM productos ORDER BY categoria ASC";
$result = $conexion->query($sql);

$categories = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }
}

echo json_encode($categories);

$database->close();
?>