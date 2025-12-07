<?php
    require_once dirname(__DIR__, 2)."/include/set-header.php";

    function respond($error, $message, $code = null, $http = 200) {
        http_response_code($http);
        $out = ["error" => $error, "data" => $message];
        if ($code !== null) $out["code"] = $code;
        echo json_encode($out);
        exit;
    }

    $email    = $_POST['email']    ?? '';
    $password = $_POST['password'] ?? '';

    if ($email === '' || $password === '') respond(true, "Please enter email and password");
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) respond(true, "Please enter valid email address.");

    $chk_user = $conn->prepare('SELECT id, email, `password`, full_name FROM users WHERE email=:email');
    $chk_user->execute([':email' => strtolower($email)]);
    $user = $chk_user->fetch(PDO::FETCH_OBJ);

    if (!$user || !password_verify($password, $user->password)) respond(true, "Email or password incorrect");
    require_once dirname(__DIR__, 2)."/include/update-token.php";

    try {
        require __DIR__ . "/send-otp.php";
    } catch (\Throwable $e) {
        // print_r($e);
        respond(true, "Failed to send OTP. Please try again.");
    }

    respond(false, "OTP sent to your email", $code, 200);
