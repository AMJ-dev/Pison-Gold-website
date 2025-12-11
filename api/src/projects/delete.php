<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

try {
    if (!isset($_POST["id"]) || !is_numeric($_POST["id"])) {
        echo json_encode(["error" => true, "data" => "Invalid project ID"]);
        exit;
    }

    $id = (int) $_POST["id"];

    // Fetch project with cover image
    $stmt = $conn->prepare("SELECT cover_image FROM projects WHERE id = :id LIMIT 1");
    $stmt->execute([":id" => $id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Project not found"]);
        exit;
    }

    $project = $stmt->fetch(PDO::FETCH_OBJ);

    // Fetch gallery images to delete physical files
    $g = $conn->prepare("SELECT image FROM project_gallery WHERE project_id = :id");
    $g->execute([":id" => $id]);
    $gallery = $g->fetchAll(PDO::FETCH_OBJ);

    // Delete gallery DB records
    $delGallery = $conn->prepare("DELETE FROM project_gallery WHERE project_id = :id");
    $delGallery->execute([":id" => $id]);

    // Delete gallery files
    foreach ($gallery as $img) {
        if (!empty($img->image)) {
            delete_file($img->image);
        }
    }

    // Delete cover image file
    if (!empty($project->cover_image)) {
        delete_file($project->cover_image);
    }

    // Delete project itself
    $delete = $conn->prepare("DELETE FROM projects WHERE id = :id");
    $delete->execute([":id" => $id]);

    if ($delete->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Failed to delete project"]);
        exit;
    }

    echo json_encode([
        "error" => false,
        "data"  => "Project deleted successfully"
    ]);
    exit;

} catch (Throwable $th) {
    echo json_encode([
        "error" => true,
        "data" => "Server Error: " . $th->getMessage()
    ]);
    exit;
}
