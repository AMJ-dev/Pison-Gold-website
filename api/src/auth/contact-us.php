<?php
require_once dirname(__DIR__, 2).'/include/set-header.php';

try {
    $required = ["name", "email", "message"];
    foreach ($required as $r) {
        if (!isset($_POST[$r]) || trim($_POST[$r]) === "") {
            echo json_encode(["error" => true, "data" => "All fields are required"]);
            exit;
        }
    }

    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $message = trim($_POST["message"]);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => true, "data" => "Invalid email"]);
        exit;
    }

    $html = "
        <div style='color:#ccfbf1;font-family:'Inter', Sans-serif, Arial;'>
            <h2 style='font-family:'Space Mono', monospace;color:#fff;margin-top:0;border-bottom:1px solid #1e293b;padding-bottom:10px;'>
                New Contact Message
            </h2>

            <p style='margin-bottom:10px;'><strong style='color:#fff;'>Name:</strong> {$name}</p>
            <p style='margin-bottom:20px;'><strong style='color:#fff;'>Email:</strong> {$email}</p>

            <div style='margin-top:20px;padding:15px;background:rgba(30,41,59,0.6);border-left:4px solid #00f5d4;border-radius:4px;'>
                <p style='margin:0;white-space:pre-line;color:#ccfbf1;'>{$message}</p>
            </div>
        </div>
    ";

    send_email($email, $name, "Contact Message from {$name}", $html);

    echo json_encode(["error" => false, "data" => "Message sent successfully"]);
} catch (Exception $e) {
    echo json_encode(["error" => true, "data" => "Server error"]);
}
