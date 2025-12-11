<?php
    require_once dirname(__DIR__, 2) . "/include/verify-token.php";

    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        echo json_encode(["error" => true, "data" => "Invalid request method"]);
        exit;
    }

    $full_name   = trim($_POST["full_name"] ?? "");
    $position       = trim($_POST["position"] ?? "");
    $company     = trim($_POST["company"] ?? "");
    $testimonial = trim($_POST["testimonial"] ?? "");
    $rating      = (int)($_POST["rating"] ?? 0);

    if (!$full_name || !$testimonial) {
        echo json_encode(["error" => true, "data" => "All fields are required"]);
        exit;
    }

    $image_path = null;

    if (!empty($_FILES["image"]["name"])) {
        $upload = upload_pics($_FILES["image"]);
        if ($upload["error"]) {
            echo json_encode(["error" => true, "data" => "Image Upload: " . $upload["message"]]);
            exit;
        }
        $image_path = $upload["path"];
    }

    try {
        $stmt = $conn->prepare("
            INSERT INTO testimonies (full_name, company, position, testimonial, rating, image, created_at)
            VALUES (:full_name, :company, :position, :testimonial, :rating, :image, :created_at)
        ");

        $stmt->execute([
            ":full_name"   => $full_name,
            ":company"     => $company,
            ":position"    => $position,
            ":testimonial" => $testimonial,
            ":rating"      => $rating,
            ":image"       => $image_path,
            ":created_at"  => $date_time
        ]);

        echo json_encode(["error" => false, "data" => "Testimony added successfully"]);
    } catch (Exception $e) {
        if ($image_path) delete_file($image_path);
        echo json_encode(["error" => true, "data" => "Failed to save testimony"]);
    }
