<?php
require_once dirname(__DIR__, 2) . "/include/set-header.php";

$error = true;
$data  = "Invalid request";

try {
    if (!isset($_GET["id"]) || !is_numeric($_GET["id"])) {
        echo json_encode(["error" => true, "data" => "Invalid project ID"]);
        exit;
    }

    $id = (int) $_GET["id"];

    // Get the main project
    $stmt = $conn->prepare("
        SELECT 
            id, title, short_desc, long_desc, challenges, solution, impact,
            duration, budget, team_size, location, key_results, sector,
            cover_image, created_at, updated_at
        FROM projects 
        WHERE id = :id 
        LIMIT 1
    ");
    $stmt->execute([":id" => $id]);

    if ($stmt->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Project not found"]);
        exit;
    }

    $project = $stmt->fetch(PDO::FETCH_OBJ);

    // Get gallery images
    $gallery_stmt = $conn->prepare("
        SELECT id, image 
        FROM project_gallery 
        WHERE project_id = :project_id 
        ORDER BY created_at DESC
    ");
    $gallery_stmt->execute([":project_id" => $id]);
    $gallery = $gallery_stmt->fetchAll(PDO::FETCH_OBJ);

    $project->gallery = $gallery;

    // Get similar projects (same sector, excluding current project)
    $similar_stmt = $conn->prepare("
        SELECT 
            id, title, short_desc, cover_image, duration, team_size, location, sector,
            created_at
        FROM projects 
        WHERE sector = :sector 
          AND id != :id
          AND cover_image IS NOT NULL 
          AND cover_image != ''
        ORDER BY created_at DESC 
        LIMIT 3
    ");
    $similar_stmt->execute([
        ":sector" => $project->sector,
        ":id" => $id
    ]);
    $similar_projects = $similar_stmt->fetchAll(PDO::FETCH_OBJ);

    // If less than 3 similar projects in same sector, get other recent projects
    if (count($similar_projects) < 3) {
        $limit = 3 - count($similar_projects);
        $other_stmt = $conn->prepare("
            SELECT 
                id, title, short_desc, cover_image, duration, team_size, location, sector,
                created_at
            FROM projects 
            WHERE sector != :sector 
              AND id != :id
              AND cover_image IS NOT NULL 
              AND cover_image != ''
            ORDER BY created_at DESC 
            LIMIT :limit
        ");
        $other_stmt->bindValue(":sector", $project->sector, PDO::PARAM_STR);
        $other_stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $other_stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
        $other_stmt->execute();
        
        $other_projects = $other_stmt->fetchAll(PDO::FETCH_OBJ);
        $similar_projects = array_merge($similar_projects, $other_projects);
    }

    // If still less than 3, get latest projects
    if (count($similar_projects) < 3) {
        $limit = 3 - count($similar_projects);
        $latest_stmt = $conn->prepare("
            SELECT 
                id, title, short_desc, cover_image, duration, team_size, location, sector,
                created_at
            FROM projects 
            WHERE id != :id
              AND cover_image IS NOT NULL 
              AND cover_image != ''
            ORDER BY created_at DESC 
            LIMIT :limit
        ");
        $latest_stmt->bindValue(":id", $id, PDO::PARAM_INT);
        $latest_stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
        $latest_stmt->execute();
        
        $latest_projects = $latest_stmt->fetchAll(PDO::FETCH_OBJ);
        $similar_projects = array_merge($similar_projects, $latest_projects);
    }

    // Get project statistics
    $stats_stmt = $conn->prepare("
        SELECT 
            COUNT(*) as total_projects,
            COUNT(DISTINCT sector) as sectors_covered,
            SUM(CASE WHEN duration LIKE '%Months%' OR duration LIKE '%Years%' THEN 1 ELSE 0 END) as completed_projects,
            (SELECT COUNT(DISTINCT location) FROM projects WHERE location IS NOT NULL AND location != '') as locations_covered
        FROM projects
    ");
    $stats_stmt->execute();
    $stats = $stats_stmt->fetch(PDO::FETCH_OBJ);

    $response = [
        "error" => false,
        "data" => [
            "project" => $project,
            "similar_projects" => $similar_projects,
            "stats" => $stats
        ]
    ];

    echo json_encode($response);
    exit;

} catch (Throwable $th) {
    echo json_encode(["error" => true, "data" => "Server Error: " . $th->getMessage()]);
    exit;
}