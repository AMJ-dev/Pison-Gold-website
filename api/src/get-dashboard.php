<?php
    require_once dirname(__DIR__, 1) . '/include/verify-token.php';
    
    try {
        $stmt = $conn->query("SELECT COUNT(*) AS total FROM projects");
        $total_projects = (int)$stmt->fetch(PDO::FETCH_OBJ)->total;

        $stmt = $conn->query("SELECT COUNT(*) AS total FROM teams");
        $total_teams = (int)$stmt->fetch(PDO::FETCH_OBJ)->total;

        $stmt = $conn->query("SELECT COUNT(*) AS total FROM testimonies");
        $total_testimonies = (int)$stmt->fetch(PDO::FETCH_OBJ)->total;

        $stmt = $conn->query("SELECT COUNT(*) AS total FROM project_gallery");
        $total_gallery = (int)$stmt->fetch(PDO::FETCH_OBJ)->total;

        $rp = $conn->query("
            SELECT id, title, short_desc, cover_image, created_at
            FROM projects
            ORDER BY id DESC
            LIMIT 5
        ");
        $recent_projects = $rp->fetchAll(PDO::FETCH_OBJ);

        $rt = $conn->query("
            SELECT id, full_name, position, image, created_at
            FROM teams
            ORDER BY id DESC
            LIMIT 5
        ");
        $recent_teams = $rt->fetchAll(PDO::FETCH_OBJ);

        $rte = $conn->query("
            SELECT id, full_name, company, testimonial, image, rating, created_at
            FROM testimonies
            ORDER BY id DESC
            LIMIT 5
        ");
        $recent_testimonies = $rte->fetchAll(PDO::FETCH_OBJ);

        echo json_encode([
            "error" => false,
            "stats" => [
                "projects"       => $total_projects,
                "teams"          => $total_teams,
                "testimonies"    => $total_testimonies,
                "gallery_images" => $total_gallery
            ],
            "recent_projects"     => $recent_projects,
            "recent_teams"        => $recent_teams,
            "recent_testimonies"  => $recent_testimonies
        ]);
        exit;

    } catch (Throwable $th) {
        echo json_encode([
            "error" => true,
            "data"  => "Server error: " . $th->getMessage()
        ]);
        exit;
    }
