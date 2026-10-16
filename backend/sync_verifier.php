<?php
header('Content-Type: text/plain; charset=utf-8');
require_once(__DIR__ . "/config/db.php");

$conn = $GLOBALS['conn'] ?? null;

echo "=========================================================\n";
echo "   BACKEND & DATABASE SYNCHRONIZATION DIAGNOSTIC REPORT   \n";
echo "=========================================================\n\n";

// 1. Database Connectivity
echo "[1] Database Connectivity:\n";
if (!$conn || $conn->connect_error) {
    echo "    FAILED: Cannot connect to MySQL (" . ($conn ? $conn->connect_error : 'No connection object') . ")\n";
    exit(1);
}
echo "    ✔ SUCCESS: Connected to database '{$database}' on '{$servername}:{$port}'\n";
echo "    ✔ MySQL Server: " . $conn->server_info . "\n\n";

// 2. Verify Key Tables & Row Counts
echo "[2] Master Table Synchronization:\n";
$tables = [
    'res_course_master'       => 'Courses Master',
    'res_coursename_master'   => 'Course Names Master',
    'res_college_master'      => 'Colleges / Universities Master',
    'res_country_master'      => 'Countries Master',
    'res_stream_master'       => 'Study Streams Master',
    'res_levelofstudy_master' => 'Study Levels Master',
    'res_purpose_master'      => 'Lead Purposes Master',
    'res_enquiries'           => 'Website Enquiries Table',
    'res_lead_master'         => 'CRM Leads Table'
];

foreach ($tables as $tbl => $label) {
    $r = @$conn->query("SELECT COUNT(*) AS c FROM `{$tbl}`");
    if ($r) {
        $cnt = $r->fetch_assoc()['c'];
        echo "    ✔ " . str_pad($tbl, 26) . " [{$label}] : {$cnt} records\n";
    } else {
        echo "    ✖ " . str_pad($tbl, 26) . " [{$label}] : MISSING OR ERROR\n";
    }
}
echo "\n";

// 3. Test Course Retrieval Query (Matches get_coursedata.php)
echo "[3] Active Degree Courses Query Test:\n";
$courseSql = "
    SELECT 
        c.coursemid,
        cn.coursename,
        col.cmname as college_name,
        cnt.countryname,
        los.levelofstudy as level_name,
        st.streamname as stream_name,
        c.cmduration,
        c.cmfees
    FROM res_course_master c
    LEFT JOIN res_coursename_master cn ON cn.cnmid = c.cnmid
    LEFT JOIN res_college_master col ON col.collegemid = c.collegemid
    LEFT JOIN res_country_master cnt ON cnt.countrymid = c.countrymid
    LEFT JOIN res_stream_master st ON st.streammid = c.streamname
    LEFT JOIN res_levelofstudy_master los ON los.losmid = c.levelofstudy
    ORDER BY cn.coursename ASC
    LIMIT 5
";
$courseRes = $conn->query($courseSql);
if ($courseRes && $courseRes->num_rows > 0) {
    echo "    ✔ SUCCESS: Retrieved sample courses joined from master tables:\n";
    while ($row = $courseRes->fetch_assoc()) {
        $cName = $row['coursename'] ?: 'Degree Program';
        $uni = $row['college_name'] ?: 'Partner University';
        $country = $row['countryname'] ?: 'Global';
        $level = $row['level_name'] ?: 'Higher Ed';
        echo "      - ID {$row['coursemid']}: '{$cName}' @ {$uni} ({$country} | {$level})\n";
    }
} else {
    echo "    ✖ ERROR: Failed to retrieve active courses: " . $conn->error . "\n";
}
echo "\n";

// 4. Test Live Round-Trip Lead / Enquiry Insertion
echo "[4] Live Enquiry Database Insertion & Verification:\n";
$testName = "Sync Check " . date("H:i:s");
$testEmail = "sync_check_" . time() . "@test.com";
$testPhone = "9988776655";
$testCourse = "Applied Computing M.Sc.";
$testUni = "York St John University";

$stmt = $conn->prepare("
    INSERT INTO res_enquiries (full_name, email, phone, course_name, university, target_intake, notes)
    VALUES (?, ?, ?, ?, ?, 'Fall 2026', 'Round-trip sync test')
");
if ($stmt) {
    $stmt->bind_param("sssss", $testName, $testEmail, $testPhone, $testCourse, $testUni);
    if ($stmt->execute()) {
        $insertedEnquiryId = $stmt->insert_id;
        echo "    ✔ res_enquiries: Successfully inserted test enquiry record (ID: {$insertedEnquiryId})\n";
        
        $verifyRes = $conn->query("SELECT * FROM res_enquiries WHERE id = {$insertedEnquiryId}");
        if ($verifyRes && $vRow = $verifyRes->fetch_assoc()) {
            echo "    ✔ Verified stored record: [ID: {$vRow['id']}, Name: {$vRow['full_name']}, Course: {$vRow['course_name']}]\n";
        }
    } else {
        echo "    ✖ res_enquiries execute failed: " . $stmt->error . "\n";
    }
    $stmt->close();
} else {
    echo "    ✖ res_enquiries prepare failed: " . $conn->error . "\n";
}

echo "[5] Recent Enquiries & Leads in Live MySQL Database:\n";
$latestEnquiries = $conn->query("SELECT id, full_name, email, phone, course_name, university, target_intake, created_at FROM res_enquiries ORDER BY id DESC LIMIT 3");
while ($r = $latestEnquiries->fetch_assoc()) {
    echo "    - Enquiry #{$r['id']}: {$r['full_name']} ({$r['email']} | {$r['phone']}) -> {$r['course_name']} @ {$r['university']} [{$r['created_at']}]\n";
}

echo "\n    Recent CRM Leads:\n";
$latestLeads = $conn->query("SELECT leadmid, leadno, leadname, leademail, leadmobile, remark, leadaddedon FROM res_lead_master ORDER BY leadmid DESC LIMIT 3");
while ($r = $latestLeads->fetch_assoc()) {
    echo "    - Lead #{$r['leadmid']} (No: {$r['leadno']}): {$r['leadname']} ({$r['leademail']} | {$r['leadmobile']}) -> {$r['remark']} [{$r['leadaddedon']}]\n";
}

$inspectId = 10;
$latestFullEnquiry = $conn->query("SELECT * FROM res_enquiries WHERE id = {$inspectId}");
if ($latestFullEnquiry && $row = $latestFullEnquiry->fetch_assoc()) {
    echo "\n    ✔ Detailed 16-Field Column Verification for Enquiry #{$inspectId}:\n";
    foreach ($row as $col => $val) {
        if (!empty($val)) {
            echo "       - " . str_pad($col, 28) . ": " . substr($val, 0, 75) . "\n";
        }
    }
}

echo "\n=========================================================\n";
echo "   DATABASE SYNCHRONIZATION DIAGNOSTIC COMPLETED         \n";
echo "=========================================================\n";
