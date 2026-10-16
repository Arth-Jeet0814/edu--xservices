<?php
/**
 * Database Connection Configuration
 * Education eXcellence Services Backend API
 */

if (!headers_sent()) {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database Credentials
$servername = getenv('DB_HOST') ?: "localhost";
$username   = getenv('DB_USER') ?: "rvqsakxwfu";
$password   = getenv('DB_PASS') !== false ? getenv('DB_PASS') : "PtdjtBe36C";
$database   = getenv('DB_NAME') ?: "rvqsakxwfu";
$port       = getenv('DB_PORT') ?: 3306;

if (function_exists('mysqli_report')) {
    mysqli_report(MYSQLI_REPORT_OFF);
}

// Create Database Connection
if (!isset($GLOBALS['conn']) || !$GLOBALS['conn'] || $GLOBALS['conn']->connect_error) {
    try {
        $c = @new mysqli(
            $servername,
            $username,
            $password,
            $database,
            (int)$port
        );

        if ($c && empty($c->connect_error)) {
            $GLOBALS['conn'] = $c;
            $GLOBALS['conn']->set_charset("utf8mb4");
        } else {
            $GLOBALS['conn'] = null;
        }
    } catch (Throwable $e) {
        $GLOBALS['conn'] = null;
    }
}

$conn = $GLOBALS['conn'] ?? null;


// Check Database Connection
function check_db_connection($connection)
{
    if (
        !$connection ||
        !($connection instanceof mysqli) ||
        $connection->connect_errno
    ) {
        http_response_code(500);

        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
        }

        echo json_encode([
            'success' => false,
            'message' => 'Database connection failed.'
        ]);

        exit;
    }

    return true;
}

?>