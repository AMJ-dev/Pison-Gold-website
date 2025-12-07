<?php
    require_once dirname(__DIR__, 2) . "/include/set-header.php";

    try {
        if (!empty($_GET["id"]) && ctype_digit($_GET["id"])) {
            $stmt = $conn->prepare("SELECT * FROM testimonies WHERE id = :id LIMIT 1");
            $stmt->bindValue(":id", $_GET["id"], PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_OBJ);

            if (!$result) {
                echo json_encode(["error" => true, "data" => "Testimony not found"]);
                exit;
            }

            echo json_encode(["error" => false, "data" => $result]);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM testimonies ORDER BY id DESC");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_OBJ);

        echo json_encode(["error" => false, "data" => $results]);

    } catch (Exception $e) {
        echo json_encode(["error" => true, "data" => "Server Error"]);
    }
