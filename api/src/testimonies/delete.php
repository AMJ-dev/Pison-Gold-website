<?php
    require_once dirname(__DIR__, 2) . "/include/verify-token.php";

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $id = $_POST["id"] ?? "";
    if (!ctype_digit($id)) {
        echo json_encode(["error" => true, "data" => "Invalid testimony ID"]);
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT `image` FROM testimonies WHERE id = :id LIMIT 1");
        $stmt->execute([":id" => $id]);
        $testimony = $stmt->fetch(PDO::FETCH_OBJ);

        if (!$testimony) {
            echo json_encode(["error" => true, "data" => "Testimony not found"]);
            exit;
        }

        $image = $testimony->image ?? "";

        // Delete database row
        $delete = $conn->prepare("DELETE FROM testimonies WHERE id = :id LIMIT 1");
        $delete->execute([":id" => $id]);

        // Delete associated image
        if (!empty($image)) {
            delete_file($image);
        }

        echo json_encode(["error" => false, "data" => "Testimony deleted successfully"]);
    } catch (Exception $e) {
        echo json_encode(["error" => true, "data" => "Failed to delete testimony"]);
    }
