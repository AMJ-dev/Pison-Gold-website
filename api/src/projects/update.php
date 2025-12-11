<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

$error = true;
$data  = "Invalid request";

try {
    if (!isset($_POST["id"]) || !is_numeric($_POST["id"])) {
        echo json_encode(["error" => true, "data" => "Invalid project ID"]);
        exit;
    }

    $id = (int) $_POST["id"];

    // Fetch existing project
    $stmt = $conn->prepare("SELECT cover_image FROM projects WHERE id = :id LIMIT 1");
    $stmt->execute([":id" => $id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Project not found"]);
        exit;
    }

    $old = $stmt->fetch(PDO::FETCH_OBJ);

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

    $cover_path = $old->cover_image;
    if (!empty($_FILES["cover_image"]["name"])) {
        $up = upload_pics($_FILES["cover_image"]);

        if ($up["error"]) {
            echo json_encode(["error" => true, "data" => $up["message"]]);
            exit;
        }
        if (!empty($cover_path)) delete_file($cover_path);

        $cover_path = $up["path"];
    }

    $update = $conn->prepare("
        UPDATE projects SET 
            title = :title,
            long_desc = :long_desc,
            short_desc = :short_desc,
            challenges = :challenges,
            solution = :solution,
            impact = :impact,
            duration = :duration,
            budget = :budget,
            team_size = :team_size,
            location = :location,
            key_results = :key_results,
            sector = :sector,
            cover_image = :cover,
            updated_at = :updated_at
        WHERE id = :id
    ");

    $update->execute([
        ":title"       => $title,
        ":long_desc"   => $long_desc,
        ":short_desc"  => $short_desc,
        ":challenges"  => $challenges,
        ":solution"    => $solution,
        ":impact"      => $impact,
        ":duration"    => $duration,
        ":budget"      => $budget,
        ":team_size"   => $team_size,
        ":location"    => $location,
        ":key_results" => $key_results,
        ":sector"      => $sector,
        ":cover"       => $cover_path,
        ":updated_at"  => date("Y-m-d H:i:s"),
        ":id"          => $id
    ]);

    // Handle gallery images (note: field name should be "gallery" to match frontend)
    if (!empty($_FILES["gallery"])) {
        foreach ($_FILES["gallery"]["name"] as $index => $filename) {
            if (!$filename) continue;

            $file = [
                "name"     => $_FILES["gallery"]["name"][$index],
                "type"     => $_FILES["gallery"]["type"][$index],
                "tmp_name" => $_FILES["gallery"]["tmp_name"][$index],
                "error"    => $_FILES["gallery"]["error"][$index],
                "size"     => $_FILES["gallery"]["size"][$index]
            ];

            $up2 = upload_pics($file);
            if ($up2["error"]) continue; 

            $addImg = $conn->prepare("INSERT INTO project_gallery (project_id, image, created_at) VALUES (:pid, :img, :created_at)");
            $addImg->execute([
                ":pid" => $id, 
                ":img" => $up2["path"],
                ":created_at" => date("Y-m-d H:i:s")
            ]);
        }
    }

    echo json_encode(["error" => false, "data"  => "Project updated successfully"]);
    exit;

} catch (Throwable $th) {
    echo json_encode(["error" => true, "data"  => "Server Error: " . $th->getMessage()]);
    exit;
}