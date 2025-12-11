<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

$error = true;
$data  = "Invalid request";

try {
    if (!isset($_POST["id"]) || !is_numeric($_POST["id"])) {
        echo json_encode(["error" => true, "data" => "Invalid image ID"]);
        exit;
    }

    $id = (int) $_POST["id"];

    // Fetch image info
    $stmt = $conn->prepare("SELECT project_id, image FROM project_gallery WHERE id = :id LIMIT 1");
    $stmt->execute([":id" => $id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Image not found"]);
        exit;
    }

    $img = $stmt->fetch(PDO::FETCH_OBJ);
    $file_path = dirname(__DIR__, 2) . "/" . $img->image;

    // Delete DB record
    $delete = $conn->prepare("DELETE FROM project_gallery WHERE id = :id");
    $delete->execute([":id" => $id]);

    if ($delete->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Failed to delete image"]);
        exit;
    }

    // Delete physical file
    if (!empty($img->image) && file_exists($file_path)) delete_file($file_path);
    
    echo json_encode([
        "error" => false,
        "data" => "Image deleted successfully"
    ]);
    exit;

} catch (Throwable $th) {
    echo json_encode([
        "error" => true,
        "data" => "Server Error: " . $th->getMessage()
    ]);
    exit;
}
