<?php
require_once 'config/database.php';

$database = new Database();
$conexion = $database->getConexion();

$category = isset($_GET['category']) ? $_GET['category'] : '';
$availability = isset($_GET['availability']) ? $_GET['availability'] : '';
$sortBy = isset($_GET['sortBy']) ? $_GET['sortBy'] : '';
$amazonOnly = isset($_GET['amazonOnly']) ? $_GET['amazonOnly'] : '';

$sql = "SELECT id, nombre, precio, foto, disponible, amazonUrl FROM productos WHERE 1=1";

if (!empty($category)) {
    $sql .= " AND categoria = ?";
}

if ($availability === 'true') {
    $sql .= " AND disponible = 1";
}

if ($amazonOnly === 'true') {
    $sql .= " AND amazonUrl IS NOT NULL AND amazonUrl != ''";
}

if ($sortBy === 'asc') {
    $sql .= " ORDER BY precio ASC";
} elseif ($sortBy === 'desc') {
    $sql .= " ORDER BY precio DESC";
}

$stmt = $conexion->prepare($sql);

if (!empty($category)) {
    $stmt->bind_param('s', $category);
}

$stmt->execute();
$result = $stmt->get_result();

$products = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$database->close();
?>