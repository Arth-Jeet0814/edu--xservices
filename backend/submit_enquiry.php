<?php

require_once(__DIR__ . "/config/db.php");

$CRM = [
    'enabled'       => true,       
    'branch_id'     => '22',      
    'assign_umid'   => '0',      
    'added_by_umid' => '485',     
    'lead_source'   => 'Website', 
    'campaign_mid'  => '6',      
    'allow_duplicates' => true, 
    'purpose'       => '',
];


if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
}

$conn = $GLOBALS['conn'] ?? ($conn ?? null);

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$fullName    = trim($data['fullName'] ?? $data['name'] ?? '');
$email       = trim($data['email'] ?? '');
$phone       = trim($data['phone'] ?? $data['mobile'] ?? '');
$courseId    = (int)($data['courseId'] ?? 0);
$courseName  = trim($data['courseName'] ?? '');
$university  = trim($data['university'] ?? '');
$targetIntake= trim($data['targetIntake'] ?? 'Fall 2026');
$notes       = trim($data['notes'] ?? $data['message'] ?? '');
$country     = trim($data['country'] ?? '');
$purpose     = trim($data['purpose'] ?? '');
$prefCountry = trim($data['preferredCountry'] ?? $data['preferCountry'] ?? '');
if (empty($fullName) || empty($email) || empty($phone)) {
    http_response_code(422);
    echo json_encode([
        "status"  => "error",
        "message" => "Please provide your full name, email, and phone number."
    ]);
    exit;
}


function crm_match_country($conn, $country)
{
    $country = trim($country);
    if ($country === '') { return '0'; }

    $aliases = [
        'usa' => ['USA', 'United States', 'United States of America', 'US', 'U.S.A'],
        'us'  => ['USA', 'United States', 'United States of America', 'US'],
        'uk'  => ['UK', 'United Kingdom', 'U.K', 'Great Britain'],
        'uae' => ['UAE', 'United Arab Emirates'],
    ];
    $candidates = [$country];
    $k = strtolower($country);
    if (isset($aliases[$k])) {
        $candidates = array_merge($candidates, $aliases[$k]);
    }

    $stmt = $conn->prepare("SELECT countryname FROM res_country_master WHERE cstatus = 'Active' AND LOWER(countryname) = LOWER(?) LIMIT 1");
    if (!$stmt) { return '0'; }
    foreach ($candidates as $c) {
        $found = null;
        $stmt->bind_param('s', $c);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($found);   
        if ($stmt->fetch() && $found !== null && $found !== '') {
            $stmt->close();
            return $found;
        }
        $stmt->free_result();
    }
    $stmt->close();
    return '0';
}


function crm_match_purpose($conn, $purpose)
{
    $purpose = trim($purpose);
    if ($purpose === '') { return ''; }
    $stmt = $conn->prepare("SELECT purposename FROM res_purpose_master WHERE LOWER(purposename) = LOWER(?) LIMIT 1");
    if (!$stmt) { return ''; }
    $stmt->bind_param('s', $purpose);
    $stmt->execute();
    $stmt->store_result();
    $found = '';
    $stmt->bind_result($found);
    $out = $stmt->fetch() ? $found : '';
    $stmt->close();
    return $out;
}

function crm_push_lead($conn, array $crm, array $d)
{
    if (empty($crm['enabled'])) {
        return 'crm-disabled';
    }
    if ($crm['branch_id'] === '' || $crm['added_by_umid'] === '') {
        return 'crm-config-missing';
    }
    if (!$conn || $conn->connect_error) {
        return 'crm-no-connection';
    }

    $t = @$conn->query("SHOW TABLES LIKE 'res_lead_master'");
    if (!$t || $t->num_rows === 0) {
        return 'crm-table-missing';
    }

    $clean = function ($v) { return trim(strip_tags((string)$v)); };

    $name   = $clean($d['name']);
    $mobile = preg_replace('/\s+/', '', $clean($d['phone']));
    $mail   = $clean($d['email']);

    $remark = 'Course: ' . $clean($d['course']) . ' | University: ' . $clean($d['university']) . ' | Intake: ' . $clean($d['intake']);
    if ($clean($d['country']) !== '') {
        $remark .= ' | Country: ' . $clean($d['country']);
    }
    if ($clean($d['notes']) !== '') {
        $remark .= ' | Notes: ' . $clean($d['notes']);
    }
    $remark .= ' [Source: Website Course Finder]';

    $countryRaw   = $clean($d['country']);
    $countryValue = crm_match_country($conn, $clean($d['preferred_country']));   
    if ($countryValue === '0') {
        $countryValue = crm_match_country($conn, $countryRaw);                   
    }

    $purposeValue = crm_match_purpose($conn, $clean($d['purpose']));
    if ($purposeValue === '') {
        $purposeValue = ($crm['purpose'] !== '') ? $crm['purpose'] : '0';
    }

    if (empty($crm['allow_duplicates'])) {
        $chk = $conn->prepare("SELECT leadmid FROM res_lead_master WHERE leadmobile = ? LIMIT 1");
        if (!$chk) { return 'crm-prepare-failed'; }
        $chk->bind_param('s', $mobile);
    } else {
        
        $since = date('Y-m-d H:i:s', time() - 86400);
        $chk = $conn->prepare("SELECT leadmid FROM res_lead_master WHERE leadmobile = ? AND remark = ? AND leadaddedon >= ? LIMIT 1");
        if (!$chk) { return 'crm-prepare-failed'; }
        $chk->bind_param('sss', $mobile, $remark, $since);
    }
    $chk->execute();
    $chk->store_result();
    if ($chk->num_rows > 0) {
        $chk->close();
        return 'crm-duplicate-skipped';
    }
    $chk->close();

    $now   = date('Y-m-d H:i:s');
    $today = date('Y-m-d');

    $conn->begin_transaction();

    $r = $conn->query("SELECT MAX(leadno) AS m FROM res_lead_master FOR UPDATE");
    $row = $r ? $r->fetch_assoc() : null;
    $leadno = (int)($row['m'] ?? 0) + 1;

    $sql = "INSERT INTO res_lead_master
        (leadno,leaddate,leadname,leadaddress,leadmobile,leademail,leadrequirement,leadsource,
         assignumid,ownerumid,leadaddedby,leadaddedon,leadupdatedby,leadupdatedon,leadbranchid,
         leadstage,leadstatus,campaignmid,leadprefferedcountry,leadedustage,leadstatuscolor,remark)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        $conn->rollback();
        return 'crm-prepare-failed';
    }

    $vals = [
        $leadno, $today, $name, '', $mobile, $mail, $purposeValue, $crm['lead_source'],
        $crm['assign_umid'], $crm['added_by_umid'], $crm['added_by_umid'], $now, $crm['added_by_umid'], $now, $crm['branch_id'],
        'New', 'Open', $crm['campaign_mid'], $countryValue, '0', 'Green', $remark
    ];
    $stmt->bind_param('i' . str_repeat('s', 21), ...$vals);

    if ($stmt->execute()) {
        $conn->commit();
        $stmt->close();
        return 'crm-lead-created';
    }
    $conn->rollback();
    $stmt->close();
    return 'crm-insert-failed';
}

$logEntry = date('Y-m-d H:i:s') . " | Name: $fullName | Email: $email | Phone: $phone | Course: $courseName | University: $university | Intake: $targetIntake\n";
@file_put_contents(__DIR__ . "/inquiries.log", $logEntry, FILE_APPEND);

$crmStatus = crm_push_lead($conn, $CRM, [
    'name' => $fullName, 'email' => $email, 'phone' => $phone,
    'course' => $courseName, 'university' => $university, 'intake' => $targetIntake, 'notes' => $notes,
    'country' => $country, 'purpose' => $purpose, 'preferred_country' => $prefCountry
]);
@file_put_contents(__DIR__ . "/inquiries.log", "   -> CRM: $crmStatus\n", FILE_APPEND);

if ($conn && !$conn->connect_error) {
    $createTableSql = "
        CREATE TABLE IF NOT EXISTS res_enquiries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            course_id INT NULL,
            course_name VARCHAR(255) NULL,
            university VARCHAR(255) NULL,
            target_intake VARCHAR(100) NULL,
            notes TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    @mysqli_query($conn, $createTableSql);

    $stmt = $conn->prepare("
        INSERT INTO res_enquiries (full_name, email, phone, course_id, course_name, university, target_intake, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    if ($stmt) {
        $stmt->bind_param("sssissss", $fullName, $email, $phone, $courseId, $courseName, $university, $targetIntake, $notes);
        $stmt->execute();
    }
}

echo json_encode([
    "status"  => "success",
    "message" => "Your course inquiry has been successfully received. Our educational advisor will reach out shortly."
]);
?>
