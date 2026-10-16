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

// 1. Extract 16 Institutional Fields + Common Form Fields
$institutionName          = trim($data['institutionName'] ?? $data['university'] ?? '');
$institutionType          = trim($data['institutionType'] ?? '');
$ownershipType            = trim($data['ownershipType'] ?? '');
$curriculumType           = trim($data['curriculumType'] ?? '');
$institutionalPositioning = trim($data['institutionalPositioning'] ?? '');
$languageOfInstruction    = trim($data['languageOfInstruction'] ?? '');
$country                  = trim($data['country'] ?? $data['preferredCountry'] ?? '');
$studentPopulation        = trim($data['studentPopulation'] ?? '');
$internationalOrientation = trim($data['internationalOrientation'] ?? '');
$parentMarketType         = trim($data['parentMarketType'] ?? '');
$contactName              = trim($data['contactName'] ?? $data['fullName'] ?? $data['name'] ?? '');
$decisionMakerType        = trim($data['decisionMakerType'] ?? '');
$contactTitle             = trim($data['contactTitle'] ?? $data['role'] ?? '');
$email                    = trim($data['email'] ?? '');
$phone                    = trim($data['phone'] ?? $data['mobile'] ?? '');
$rationale                = trim($data['rationale'] ?? $data['notes'] ?? $data['message'] ?? $data['discussionFocus'] ?? '');

// Course-specific parameters (when initiated from Course Finder)
$courseId                 = (int)($data['courseId'] ?? 0);
$courseName               = trim($data['courseName'] ?? '');
$targetIntake             = trim($data['targetIntake'] ?? 'Upcoming Academic Cycle');
$purpose                  = trim($data['purpose'] ?? 'Private Institutional Briefing');
$prefCountry              = trim($data['preferredCountry'] ?? $data['preferCountry'] ?? $country);

// Validation
if (empty($contactName) || empty($email) || empty($phone)) {
    http_response_code(422);
    echo json_encode([
        "status"  => "error",
        "message" => "Please provide your contact name, official email, and phone number."
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

    // Build rich, structured remark for CRM lead
    $parts = [];
    if (!empty($d['institution']))   $parts[] = "Institution: " . $clean($d['institution']);
    if (!empty($d['inst_type']))     $parts[] = "Type: " . $clean($d['inst_type']);
    if (!empty($d['ownership']))     $parts[] = "Ownership: " . $clean($d['ownership']);
    if (!empty($d['curriculum']))    $parts[] = "Curriculum: " . $clean($d['curriculum']);
    if (!empty($d['positioning']))   $parts[] = "Positioning: " . $clean($d['positioning']);
    if (!empty($d['language']))      $parts[] = "Language: " . $clean($d['language']);
    if (!empty($d['population']))    $parts[] = "Population: " . $clean($d['population']);
    if (!empty($d['orientation']))   $parts[] = "Orientation: " . $clean($d['orientation']);
    if (!empty($d['market']))        $parts[] = "Market: " . $clean($d['market']);
    if (!empty($d['title']))         $parts[] = "Title: " . $clean($d['title']);
    if (!empty($d['role']))          $parts[] = "Role: " . $clean($d['role']);
    if (!empty($d['course']))        $parts[] = "Course: " . $clean($d['course']);
    if (!empty($d['intake']))        $parts[] = "Intake: " . $clean($d['intake']);
    if (!empty($d['country']))       $parts[] = "Country: " . $clean($d['country']);
    if (!empty($d['rationale']))     $parts[] = "Rationale: " . $clean($d['rationale']);
    if (!empty($d['notes']))         $parts[] = "Notes: " . $clean($d['notes']);

    $remark = implode(" | ", $parts);
    if (empty($remark)) {
        $remark = "Institutional Inquiry";
    }
    $remark .= " [Source: Website {$d['purpose']}]";

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

// Push to CRM Lead Master
$crmStatus = crm_push_lead($conn, $CRM, [
    'name'              => $contactName,
    'email'             => $email,
    'phone'             => $phone,
    'institution'       => $institutionName,
    'inst_type'         => $institutionType,
    'ownership'         => $ownershipType,
    'curriculum'        => $curriculumType,
    'positioning'       => $institutionalPositioning,
    'language'          => $languageOfInstruction,
    'country'           => $country,
    'population'        => $studentPopulation,
    'orientation'       => $internationalOrientation,
    'market'            => $parentMarketType,
    'title'             => $contactTitle,
    'role'              => $decisionMakerType,
    'rationale'         => $rationale,
    'course'            => $courseName,
    'intake'            => $targetIntake,
    'purpose'           => $purpose,
    'preferred_country' => $prefCountry
]);

// 2. Synchronize to Dedicated Database Table (res_enquiries)
if ($conn && !$conn->connect_error) {
    // 2a. Create table if not exists with all 16 fields
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
            institution_name VARCHAR(255) NULL,
            institution_type VARCHAR(150) NULL,
            ownership_type VARCHAR(100) NULL,
            curriculum_type VARCHAR(150) NULL,
            institutional_positioning VARCHAR(100) NULL,
            language_of_instruction VARCHAR(150) NULL,
            country VARCHAR(100) NULL,
            student_population VARCHAR(100) NULL,
            international_orientation VARCHAR(150) NULL,
            parent_market_type VARCHAR(150) NULL,
            contact_name VARCHAR(255) NULL,
            decision_maker_type VARCHAR(150) NULL,
            contact_title VARCHAR(150) NULL,
            rationale TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ";
    @mysqli_query($conn, $createTableSql);

    // 2b. Add columns if table already existed without them
    $alterQueries = [
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS institution_name VARCHAR(255) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS institution_type VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS ownership_type VARCHAR(100) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS curriculum_type VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS institutional_positioning VARCHAR(100) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS language_of_instruction VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS country VARCHAR(100) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS student_population VARCHAR(100) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS international_orientation VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS parent_market_type VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS contact_name VARCHAR(255) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS decision_maker_type VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS contact_title VARCHAR(150) NULL",
        "ALTER TABLE res_enquiries ADD COLUMN IF NOT EXISTS rationale TEXT NULL"
    ];
    foreach ($alterQueries as $altSql) {
        @mysqli_query($conn, $altSql);
    }

    // 2c. Prepare consolidated notes
    $combinedNotes = $rationale;
    if (!empty($institutionType) || !empty($curriculumType) || !empty($contactTitle)) {
        $combinedNotes = "Title: {$contactTitle} | Role: {$decisionMakerType} | Type: {$institutionType} | Curriculum: {$curriculumType} | Country: {$country} | Positioning: {$institutionalPositioning} | Context: {$rationale}";
    }

    // 2d. Insert record into res_enquiries
    $stmt = $conn->prepare("
        INSERT INTO res_enquiries (
            full_name, email, phone, course_id, course_name, university, target_intake, notes,
            institution_name, institution_type, ownership_type, curriculum_type,
            institutional_positioning, language_of_instruction, country, student_population,
            international_orientation, parent_market_type, contact_name, decision_maker_type,
            contact_title, rationale
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    if ($stmt) {
        $stmt->bind_param(
            "sssissssssssssssssssss",
            $contactName, $email, $phone, $courseId, $courseName, $institutionName, $targetIntake, $combinedNotes,
            $institutionName, $institutionType, $ownershipType, $curriculumType,
            $institutionalPositioning, $languageOfInstruction, $country, $studentPopulation,
            $internationalOrientation, $parentMarketType, $contactName, $decisionMakerType,
            $contactTitle, $rationale
        );
        $stmt->execute();
        $stmt->close();
    }
}

// Log locally for debugging
$logEntry = date('Y-m-d H:i:s') . " | Name: $contactName | Inst: $institutionName | Email: $email | Phone: $phone | Country: $country | CRM: $crmStatus\n";
@file_put_contents(__DIR__ . "/inquiries.log", $logEntry, FILE_APPEND);

echo json_encode([
    "status"  => "success",
    "message" => "Your institutional briefing request has been successfully received. Our educational advisor will reach out shortly."
]);
?>
