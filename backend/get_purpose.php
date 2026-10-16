<?php
/**
 * GET Purpose Master API
 * Synced with eduexcellence.sql (res_purpose_master)
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$data = [];

if ($conn) {
    $sql = "
        SELECT DISTINCT purposemid, purposename 
        FROM res_purpose_master 
        WHERE purposename IS NOT NULL AND TRIM(purposename) != ''
        ORDER BY purposename ASC
    ";

    $result = @mysqli_query($conn, $sql);
    if ($result) {
        while ($r = mysqli_fetch_assoc($result)) {
            $name = trim($r['purposename']);
            if (!empty($name)) {
                $data[] = [
                    'id'         => (int)$r['purposemid'],
                    'purposemid' => (int)$r['purposemid'],
                    'name'       => $name,
                    'label'      => $name,
                    'value'      => $name
                ];
            }
        }
    }
}

// Default fallback list if database table is empty or disconnected
if (empty($data)) {
    $fallback = [
        ['id' => 173, 'purposemid' => 173, 'name' => 'Study Abroad', 'label' => 'Study Abroad', 'value' => 'Study Abroad'],
        ['id' => 172, 'purposemid' => 172, 'name' => 'Student Visa', 'label' => 'Student Visa', 'value' => 'Student Visa'],
        ['id' => 157, 'purposemid' => 157, 'name' => 'Coaching', 'label' => 'Coaching', 'value' => 'Coaching'],
        ['id' => 168, 'purposemid' => 168, 'name' => 'Dependent Visa', 'label' => 'Dependent Visa', 'value' => 'Dependent Visa'],
        ['id' => 169, 'purposemid' => 169, 'name' => 'Visa', 'label' => 'Visa', 'value' => 'Visa'],
        ['id' => 170, 'purposemid' => 170, 'name' => 'Work-Permit', 'label' => 'Work-Permit', 'value' => 'Work-Permit'],
        ['id' => 171, 'purposemid' => 171, 'name' => 'Visitor Visa', 'label' => 'Visitor Visa', 'value' => 'Visitor Visa'],
        ['id' => 176, 'purposemid' => 176, 'name' => 'B2B Agent Tie-up', 'label' => 'B2B Agent Tie-up', 'value' => 'B2B Agent Tie-up'],
        ['id' => 225, 'purposemid' => 225, 'name' => 'ACCA', 'label' => 'ACCA', 'value' => 'ACCA'],
        ['id' => 226, 'purposemid' => 226, 'name' => 'Degree', 'label' => 'Degree', 'value' => 'Degree'],
        ['id' => 219, 'purposemid' => 219, 'name' => 'Class 12', 'label' => 'Class 12', 'value' => 'Class 12'],
        ['id' => 223, 'purposemid' => 223, 'name' => 'Plus Two', 'label' => 'Plus Two', 'value' => 'Plus Two'],
        ['id' => 240, 'purposemid' => 240, 'name' => 'Studying Abroad', 'label' => 'Studying Abroad', 'value' => 'Studying Abroad']
    ];
    $data = $fallback;
}

echo json_encode($data);
?>
