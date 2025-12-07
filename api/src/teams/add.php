<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php"; 

$error = true;
$data  = "Invalid request";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $full_name = trim($_POST["full_name"] ?? "");
    $email     = trim($_POST["email"] ?? "");
    $phone     = trim($_POST["phone"] ?? "");
    $position  = trim($_POST["position"] ?? "");
    $bio       = trim($_POST["bio"] ?? "");
    $facebook  = trim($_POST["facebook"] ?? "");
    $linkedin  = trim($_POST["linkedin"] ?? "");
    $twitter   = trim($_POST["twitter"] ?? "");

    if ($full_name === "" || $position === "" || $bio === "") {
        echo json_encode(["error" => true, "data" => "Full name, position, and bio are required"]);
        exit;
    }

    // Handle optional image upload
    $image_path = null;
    if (!empty($_FILES["image"]["name"])) {
        $upload = upload_pics($_FILES["image"]);
        if ($upload["error"]) {
            echo json_encode(["error" => true, "data" => $upload["message"]]);
            exit;
        }
        $image_path = $upload["path"];
    }

    $stmt = $conn->prepare("
        INSERT INTO teams (full_name, email, phone, position, bio, image, facebook, linkedin, twitter, created_at)
        VALUES (:full_name, :email, :phone, :position, :bio, :image, :facebook, :linkedin, :twitter, :created_at)
    ");

    $stmt->bindValue(":full_name", $full_name);
    $stmt->bindValue(":email", $email);
    $stmt->bindValue(":phone", $phone);
    $stmt->bindValue(":position", $position);
    $stmt->bindValue(":bio", $bio);
    $stmt->bindValue(":image", $image_path);
    $stmt->bindValue(":facebook", $facebook);
    $stmt->bindValue(":linkedin", $linkedin);
    $stmt->bindValue(":twitter", $twitter);
    $stmt->bindValue(":created_at", date("Y-m-d H:i:s"));

    if ($stmt->execute()) {
        echo json_encode(["error" => false, "data" => "Team member added successfully"]);
        exit;
    }

    echo json_encode(["error" => true, "data" => "Failed to add team member"]);
    exit;

} catch (Throwable $th) {
    echo json_encode(["error" => true, "data" => "Server Error: " . $th->getMessage()]);
    exit;
}
