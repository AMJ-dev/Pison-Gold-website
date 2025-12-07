<?php
require_once dirname(__DIR__, 2) . "/include/verify-token.php";

$error = true;
$data  = "Invalid request";

try {
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $id = intval($_POST["id"] ?? 0);

    if ($id <= 0) {
        echo json_encode(["error" => true, "data" => "Invalid team ID"]);
        exit;
    }

    // Fetch team member
    $get = $conn->prepare("SELECT image FROM teams WHERE id = :id LIMIT 1");
    $get->bindValue(":id", $id, PDO::PARAM_INT);
    $get->execute();

    if ($get->rowCount() === 0) {
        echo json_encode(["error" => true, "data" => "Team member not found"]);
        exit;
    }

    $team = $get->fetch(PDO::FETCH_OBJ);

    // Delete image if exists
    if (!empty($team->image)) {
        delete_file($team->image);
    }

    // Delete record
    $del = $conn->prepare("DELETE FROM teams WHERE id = :id");
    $del->bindValue(":id", $id, PDO::PARAM_INT);

    if ($del->execute()) {
        echo json_encode(["error" => false, "data" => "Team member deleted successfully"]);
        exit;
    }

    echo json_encode(["error" => true, "data" => "Failed to delete team member"]);
    exit;

} catch (Throwable $th) {
    echo json_encode([
        "error" => true,
        "data"  => "Server Error: " . $th->getMessage()
    ]);
    exit;
}
