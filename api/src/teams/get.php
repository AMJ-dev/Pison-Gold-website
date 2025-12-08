<?php
    require_once dirname(__DIR__, 2) . "/include/set-header.php";

    try {
        $id = isset($_GET["id"]) ? intval($_GET["id"]) : 0;

        if ($id > 0) {
            $stmt = $conn->prepare("SELECT * FROM teams WHERE id = :id LIMIT 1");
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                echo json_encode(["error" => true, "data" => "Team member not found"]);
                exit;
            }

            $team = $stmt->fetch(PDO::FETCH_OBJ);
            echo json_encode(["error" => false, "data" => $team]);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM teams ORDER BY id DESC");
        $stmt->execute();

        $teams = $stmt->fetchAll(PDO::FETCH_OBJ);

        echo json_encode([
            "error" => false,
            "data" => $teams
        ]);
        exit;

    } catch (Throwable $th) {
        echo json_encode([
            "error" => true,
            "data" => "Server Error: " . $th->getMessage()
        ]);
        exit;
    }
