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

    if ($title === "") {
        echo json_encode(["error" => true, "data" => "Title is required"]);
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
            cover_image = :cover
        WHERE id = :id
    ");

    $update->execute([
        ":title"       => $title,
        ":long_desc"   => $long_desc,
        ":short_desc"  => $short_desc,
        ":challenges"  => $challenges,
        ":solution"    => $solution,
        ":impact"      => $impact,
        ":cover"       => $cover_path,
        ":id"          => $id
    ]);

    if (isset($_FILES["gallery_images"])) {
        foreach ($_FILES["gallery_images"]["name"] as $index => $filename) {
            if (!$filename) continue;

            $file = [
                "name"     => $_FILES["gallery_images"]["name"][$index],
                "type"     => $_FILES["gallery_images"]["type"][$index],
                "tmp_name" => $_FILES["gallery_images"]["tmp_name"][$index],
                "error"    => $_FILES["gallery_images"]["error"][$index],
                "size"     => $_FILES["gallery_images"]["size"][$index]
            ];

            $up2 = upload_pics($file);
            if ($up2["error"]) continue; 

            $addImg = $conn->prepare("INSERT INTO project_gallery (project_id, image) VALUES (:pid, :img)");
            $addImg->execute([":pid" => $id, ":img" => $up2["path"]]);
        }
    }

    echo json_encode(["error" => false, "data"  => "Project updated successfully"]);
    exit;

} catch (Throwable $th) {
    echo json_encode(["error" => true, "data"  => "Server Error: " . $th->getMessage()]);
    exit;
}
