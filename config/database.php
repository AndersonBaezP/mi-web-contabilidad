<?php
// config/database.php
// Archivo de configuración para la conexión a MySQL

class Database {
    private $host = 'localhost';
    private $db_name = 'contactos_web';
    private $username = 'root';        // Usuario de MySQL
    private $password = '123456';      // Contraseña de MySQL
    private $conn;

    // Obtener conexión a la base de datos
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8",
                $this->username,
                $this->password
            );
            
            // Configurar atributos PDO
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
        } catch(PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }

        return $this->conn;
    }

    // Método para probar la conexión
    public function testConnection() {
        try {
            $conn = $this->getConnection();
            if ($conn) {
                return [
                    'status' => 'success',
                    'message' => 'Conexión exitosa a la base de datos'
                ];
            }
        } catch(Exception $e) {
            return [
                'status' => 'error',
                'message' => 'Error de conexión: ' . $e->getMessage()
            ];
        }
    }
}
?>


