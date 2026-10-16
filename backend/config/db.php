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

// Optional: Load .env file if present in workspace root or backend directory
$envPaths = [__DIR__ . '/../../.env', __DIR__ . '/../.env', __DIR__ . '/.env'];
foreach ($envPaths as $envPath) {
    if (file_exists($envPath) && is_readable($envPath)) {
        $lines = @file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines) {
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || strpos($line, '#') === 0) continue;
                if (strpos($line, '=') !== false) {
                    list($envKey, $envVal) = explode('=', $line, 2);
                    $envKey = trim($envKey);
                    $envVal = trim(trim($envVal), "\"'");
                    if (getenv($envKey) === false) {
                        putenv("{$envKey}={$envVal}");
                        $_ENV[$envKey] = $envVal;
                        $_SERVER[$envKey] = $envVal;
                    }
                }
            }
        }
        break;
    }
}

if (!function_exists('get_db_config')) {
    function get_db_config($key, $default = '') {
        $val = getenv($key);
        if ($val !== false && $val !== '') return $val;
        if (isset($_ENV[$key]) && $_ENV[$key] !== '') return $_ENV[$key];
        if (isset($_SERVER[$key]) && $_SERVER[$key] !== '') return $_SERVER[$key];
        return $default;
    }
}

// Database Credentials
$servername = get_db_config('DB_HOST', 'localhost');
$username   = get_db_config('DB_USER', 'root');
$password   = get_db_config('DB_PASS', '');
$database   = get_db_config('DB_NAME', 'rvqsakxwfu');
$port       = (int)get_db_config('DB_PORT', 3306);

if (function_exists('mysqli_report')) {
    mysqli_report(MYSQLI_REPORT_OFF);
}

// Create Database Connection
if (!isset($GLOBALS['conn']) || !$GLOBALS['conn'] || $GLOBALS['conn']->connect_error) {
    try {
        $c = @new mysqli($servername, $username, $password, $database, (int)$port);
        if (!$c || $c->connect_error) {
            // Fallback attempt with rvqsakxwfu user
            $c = @new mysqli($servername, "rvqsakxwfu", "PtdjtBe36C", $database, (int)$port);
        }
        if (!$c || $c->connect_error) {
            // Fallback attempt with root/root
            $c = @new mysqli($servername, "root", "root", $database, (int)$port);
        }

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
if (!function_exists('check_db_connection')) {
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
}

?>