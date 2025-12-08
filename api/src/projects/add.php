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
    $long_desc   = trim($_POST["long_desc"] ?? "");
    $short_desc  = trim($_POST["short_desc"] ?? "");
    $challenges  = trim($_POST["challenges"] ?? "");
    $solution    = trim($_POST["solution"] ?? "");
    $impact      = trim($_POST["impact"] ?? "");
    
    // New fields
    $duration    = trim($_POST["duration"] ?? "");
    $budget      = trim($_POST["budget"] ?? "");
    $team_size   = trim($_POST["team_size"] ?? "");
    $location    = trim($_POST["location"] ?? "");
    $key_results = trim($_POST["key_results"] ?? "");
    $sector      = trim($_POST["sector"] ?? "");

    if ($title === "" || $short_desc === "") {
        echo json_encode(["error" => true, "data" => "Title and short description are required"]);
        exit;
    }

    if (strlen($short_desc) > 200) {
        echo json_encode(["error" => true, "data" => "Short description must be less than 200 characters"]);
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

    // Insert project with new fields
    $stmt = $conn->prepare("
        INSERT INTO projects (
            title, long_desc, short_desc, challenges, solution, impact,
            duration, budget, team_size, location, key_results, sector,
            cover_image, created_at
        ) VALUES (
            :title, :long_desc, :short_desc, :challenges, :solution, :impact,
            :duration, :budget, :team_size, :location, :key_results, :sector,
            :cover_image, :created_at
        )
    ");

    $stmt->bindValue(":title", $title);
    $stmt->bindValue(":long_desc", $long_desc);
    $stmt->bindValue(":short_desc", $short_desc);
    $stmt->bindValue(":challenges", $challenges);
    $stmt->bindValue(":solution", $solution);
    $stmt->bindValue(":impact", $impact);
    
    // Bind new fields
    $stmt->bindValue(":duration", $duration);
    $stmt->bindValue(":budget", $budget);
    $stmt->bindValue(":team_size", $team_size);
    $stmt->bindValue(":location", $location);
    $stmt->bindValue(":key_results", $key_results);
    $stmt->bindValue(":sector", $sector);
    
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