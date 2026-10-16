<?php
/**
 * GET Levels of Study API
 * Synced with res_levelofstudy_master in eduexcellence database
 */

require_once(__DIR__ . "/config/db.php");
$conn = $GLOBALS['conn'] ?? $conn;

if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$data = [];

if ($conn) {
    $sql = "
        SELECT DISTINCT los.losmid, los.levelofstudy
        FROM res_levelofstudy_master los
        WHERE los.levelofstudy IS NOT NULL 
        AND TRIM(los.levelofstudy) != ''
        AND los.losmid IN (SELECT DISTINCT levelofstudy FROM res_course_master WHERE levelofstudy > 0)
        ORDER BY los.levelofstudy ASC
    ";

    $result = @mysqli_query($conn, $sql);
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $name = trim($row['levelofstudy']);
            if (!empty($name)) {
                $data[] = [
                    'id'    => (int)$row['losmid'],
                    'value' => (string)$row['losmid'],
                    'label' => $name,
                    'name'  => $name
                ];
            }
        }
    }
}

echo json_encode($data);
?>
