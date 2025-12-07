<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

$error = true;
$data  = "Invalid request";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $title       = trim($_POST["title"] ?? "");
    $description = trim($_POST["description"] ?? "");
    $challenges  = trim($_POST["challenges"] ?? "");
    $solution    = trim($_POST["solution"] ?? "");
    $impact      = trim($_POST["impact"] ?? "");

    if ($title === "" || $description === "") {
        echo json_encode(["error" => true, "data" => "Title and description are required"]);
        exit;
    }

    // Upload main cover image (optional)
    $cover_image = null;
    if (!empty($_FILES["cover_image"]["name"])) {
        $upload = upload_pics($_FILES["cover_image"]);
        if ($upload["error"]) {
            echo json_encode(["error" => true, "data" => $upload["message"]]);
            exit;
        }
        $cover_image = $upload["path"];
    }

    // Insert project
    $stmt = $conn->prepare("
        INSERT INTO projects (title, description, challenges, solution, impact, cover_image, created_at)
        VALUES (:title, :description, :challenges, :solution, :impact, :cover_image, :created_at)
    ");

    $stmt->bindValue(":title", $title);
    $stmt->bindValue(":description", $description);
    $stmt->bindValue(":challenges", $challenges);
    $stmt->bindValue(":solution", $solution);
    $stmt->bindValue(":impact", $impact);
    $stmt->bindValue(":cover_image", $cover_image);
    $stmt->bindValue(":created_at", date("Y-m-d H:i:s"));

    if (!$stmt->execute()) {
        echo json_encode(["error" => true, "data" => "Failed to add project"]);
        exit;
    }

    $project_id = $conn->lastInsertId();

    // Handle gallery images
    if (!empty($_FILES["gallery"])) {
        foreach ($_FILES["gallery"]["name"] as $i => $name) {

            if ($name === "") continue;

            $file = [
                "name"     => $_FILES["gallery"]["name"][$i],
                "type"     => $_FILES["gallery"]["type"][$i],
                "tmp_name" => $_FILES["gallery"]["tmp_name"][$i],
                "error"    => $_FILES["gallery"]["error"][$i],
                "size"     => $_FILES["gallery"]["size"][$i],
            ];

            $upload = upload_pics($file);

            if ($upload["error"]) {
                // If one fails, continue but report it
                continue;
            }

            $img = $upload["path"];

            $g = $conn->prepare("
                INSERT INTO project_gallery (project_id, image, created_at)
                VALUES (:project_id, :image, :created_at)
            ");
            $g->execute([
                ":project_id" => $project_id,
                ":image"      => $img,
                ":created_at" => date("Y-m-d H:i:s")
            ]);
        }
    }

    echo json_encode([
        "error" => false,
        "data"  => "Project added successfully",
        "project_id" => $project_id
    ]);
    exit;

} catch (Throwable $th) {
    echo json_encode([
        "error" => true,
        "data" => "Server Error: " . $th->getMessage()
    ]);
    exit;
}
