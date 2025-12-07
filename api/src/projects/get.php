<?php
    require_once dirname(__DIR__, 2) . "/include/verify-token.php";
    try {
        $projects_stmt = $conn->prepare("SELECT * FROM projects ORDER BY id DESC");
        $projects_stmt->execute();
        $projects = $projects_stmt->fetchAll(PDO::FETCH_OBJ);

        foreach ($projects as $p) {
            $gallery_stmt = $conn->prepare("SELECT * FROM project_gallery WHERE project_id = :pid ORDER BY id ASC LIMIT 2");
            $gallery_stmt->bindValue(":pid", $p->id, PDO::PARAM_INT);
            $gallery_stmt->execute();
            $p->gallery = $gallery_stmt->fetchAll(PDO::FETCH_OBJ);
        }
        echo json_encode(["error" => false, "data" => $projects]);
        exit;
    } catch (Throwable $th) {
        echo json_encode(["error" => true, "data" => "Server Error: " . $th->getMessage()]);
        exit;
    }
