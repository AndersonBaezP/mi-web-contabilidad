<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
// procesar_contacto.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Incluir el archivo de configuración de la base de datos
require_once 'config/database.php';

// Función para limpiar datos de entrada
function limpiarDatos($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Función para validar email
function validarEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Verificar que sea una petición POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }

    // Validar que todos los campos requeridos estén presentes
    $campos_requeridos = ['nombre', 'email', 'empresa', 'mensaje'];
    foreach ($campos_requeridos as $campo) {
        if (empty($_POST[$campo])) {
            throw new Exception("El campo $campo es requerido");
        }
    }

    // Limpiar y validar datos
    $nombre   = limpiarDatos($_POST['nombre']);
    $email    = limpiarDatos($_POST['email']);
    $telefono = isset($_POST['telefono']) ? limpiarDatos($_POST['telefono']) : null;
    $empresa  = limpiarDatos($_POST['empresa']);
    $mensaje  = limpiarDatos($_POST['mensaje']);
    $ip_address = $_SERVER['REMOTE_ADDR'];

    // Validaciones adicionales
    if (strlen($nombre) < 2) {
        throw new Exception('El nombre debe tener al menos 2 caracteres');
    }

    if (!validarEmail($email)) {
        throw new Exception('El email no tiene un formato válido');
    }

    if (strlen($empresa) < 3) {
        throw new Exception('La empresa debe tener al menos 3 caracteres');
    }

    if (strlen($mensaje) < 5) { // puse 5 para pruebas, luego subes a 10
        throw new Exception('El mensaje debe tener al menos 5 caracteres');
    }

    // Crear conexión a la base de datos
    $database = new Database();
    $conn = $database->getConnection();

    if (!$conn) {
        throw new Exception('No se pudo establecer conexión con la base de datos');
    }

    // Preparar la consulta SQL
    $stmt = $conn->prepare("INSERT INTO contactos 
        (nombre, email, telefono, empresa, mensaje, ip_address) 
        VALUES (:nombre, :email, :telefono, :empresa, :mensaje, :ip_address)");
    
    // Vincular parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':empresa', $empresa);
    $stmt->bindParam(':mensaje', $mensaje);
    $stmt->bindParam(':ip_address', $ip_address);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        $contacto_id = $conn->lastInsertId();
        
        $response = [
            'status' => 'exito',
            'mensaje' => '¡Gracias por contactarnos! Tu mensaje ha sido enviado correctamente.',
            'id' => $contacto_id
        ];
    } else {
        throw new Exception('Error al guardar en la base de datos');
    }

    // Cerrar conexiones
    $stmt = null;
    $conn = null;

} catch (Exception $e) {
    $response = [
        'status' => 'error',
        'mensaje' => 'Error: ' . $e->getMessage()
    ];
}

// Enviar respuesta JSON
echo json_encode($response);
?>
