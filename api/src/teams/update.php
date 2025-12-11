<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0) {
        echo json_encode(["error" => true, "data" => "Invalid team ID"]);
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

    // Fetch existing team member
    $stmt = $conn->prepare("SELECT image FROM teams WHERE id = :id LIMIT 1");
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Team member not found"]);
        exit;
    }

    $team = $stmt->fetch(PDO::FETCH_OBJ);
    $old_image = $team->image;

    // Handle optional image upload
    $new_image = $old_image;
    if (!empty($_FILES["image"]["name"])) {
        $upload = upload_pics($_FILES["image"]);
        if ($upload["error"]) {
            echo json_encode(["error" => true, "data" => $upload["message"]]);
            exit;
        }

        // Delete old file
        if (!empty($old_image)) {
            delete_file($old_image);
        }

        $new_image = $upload["path"];
    }

    // Update record
    $update = $conn->prepare("
        UPDATE teams SET 
            full_name = :full_name,
            email = :email,
            phone = :phone,
            position = :position,
            bio = :bio,
            image = :image,
            facebook = :facebook,
            linkedin = :linkedin,
            twitter = :twitter
        WHERE id = :id
    ");

    $update->bindValue(":full_name", $full_name);
    $update->bindValue(":email", $email);
    $update->bindValue(":phone", $phone);
    $update->bindValue(":position", $position);
    $update->bindValue(":bio", $bio);
    $update->bindValue(":image", $new_image);
    $update->bindValue(":facebook", $facebook);
    $update->bindValue(":linkedin", $linkedin);
    $update->bindValue(":twitter", $twitter);
    $update->bindValue(":id", $id, PDO::PARAM_INT);

    if ($update->execute()) {
        echo json_encode(["error" => false, "data" => "Team member updated successfully"]);
        exit;
    }

    echo json_encode(["error" => true, "data" => "Failed to update team member"]);
    exit;

} catch (Throwable $th) {
    echo json_encode([
        "error" => true,
        "data" => "Server Error: " . $th->getMessage()
    ]);
    exit;
}
