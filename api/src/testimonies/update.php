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

    $full_name   = trim($_POST["full_name"] ?? "");
    $position    = trim($_POST["position"] ?? "");
    $company     = trim($_POST["company"] ?? "");
    $testimonial = trim($_POST["testimonial"] ?? "");
    $rating      = (int)($_POST["rating"] ?? 0);

    if (!$full_name|| !$testimonial) {
        echo json_encode(["error" => true, "data" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT image FROM testimonies WHERE id = :id LIMIT 1");
    $stmt->execute([":id" => $id]);
    $current = $stmt->fetch(PDO::FETCH_OBJ);

    if (!$current) {
        echo json_encode(["error" => true, "data" => "Testimony not found"]);
        exit;
    }

    $image_path = $current->image; // keep existing image by default

    // Optional new image upload
    if (!empty($_FILES["image"]["name"])) {
        $upload = upload_pics($_FILES["image"]);

        if ($upload["error"]) {
            echo json_encode(["error" => true, "data" => "Image Upload: " . $upload["message"]]);
            exit;
        }

        if ($image_path) {
            delete_file($image_path);
        }

        $image_path = $upload["path"];
    }

    try {
        $update = $conn->prepare("
            UPDATE testimonies 
            SET full_name = :full_name,
                position = :position,
                company = :company,
                testimonial = :testimonial,
                rating = :rating,
                image = :image
            WHERE id = :id
            LIMIT 1
        ");

        $update->execute([
            ":full_name"   => $full_name,
            ":position"       => $position,
            ":company"     => $company,
            ":testimonial" => $testimonial,
            ":rating"      => $rating,
            ":image"       => $image_path,
            ":id"          => $id
        ]);

        echo json_encode(["error" => false, "data" => "Testimony updated successfully"]);
    } catch (Exception $e) {
        echo json_encode(["error" => true, "data" => "Failed to update testimony"]);
    }
