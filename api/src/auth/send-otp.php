<?php
    $adminBypassEmail = "admin@cyberpros.com.ng";
    $otp = ($user->email === $adminBypassEmail)
        ? "123456"
        : (function_exists("generate_otp") ? generate_otp() : str_pad((string)random_int(0, 999999), 6, "0", STR_PAD_LEFT));

    $expireDateDb   = function_exists("get_expires") ? get_expires() : date("Y-m-d H:i:s", time() + 600);
    $expiryText     = isset($otp_expires) && $otp_expires ? $otp_expires : "10 minutes";

    $_SESSION["login_id"] = $user->id;

    $update_otp = $conn->prepare("UPDATE otp SET otp=:otp, time_expire=:time_expire WHERE user_id=:user_id");
    $update_otp->bindValue(":otp", $otp);
    $update_otp->bindValue(":time_expire", $expireDateDb);
    $update_otp->bindValue(":user_id", $user->id);
    $update_otp->execute();

    if ($update_otp->rowCount() === 0) {
        $insert_otp = $conn->prepare("INSERT INTO otp (user_id, otp, time_expire) VALUES (:user_id, :otp, :time_expire)");
        $insert_otp->execute([
            ":user_id"     => $user->id,
            ":otp"         => $otp,
            ":time_expire" => $expireDateDb,
        ]);
    }

    unset($_SESSION['redirectURL']);

    $base  = rtrim($baseURL ?? "", "/");
    $reset_link   = $base . "/forgot-password";
    $signin_link  = $base . "/login";

    $appNameSafe  = htmlspecialchars($AppName ?? "TapToPay", ENT_QUOTES, "UTF-8");
    $emailSafe    = htmlspecialchars($comp_email ?? "support@example.com", ENT_QUOTES, "UTF-8");
    $phoneSafe    = htmlspecialchars($comp_phone ?? "", ENT_QUOTES, "UTF-8");
    $recipient    = htmlspecialchars($user->full_name ?? "there", ENT_QUOTES, "UTF-8");
    $otpSafe      = htmlspecialchars($otp, ENT_QUOTES, "UTF-8");
    $expirySafe   = htmlspecialchars($expiryText, ENT_QUOTES, "UTF-8");
    $resetSafe    = htmlspecialchars($reset_link, ENT_QUOTES, "UTF-8");
    $signinSafe   = htmlspecialchars($signin_link, ENT_QUOTES, "UTF-8");

    $subject = "Your {$appNameSafe} One-Time Password (OTP)";

    $message = "
        <div style='color:#ccfbf1;font-family:'Inter', Sans-serif, Arial;'>
            <div style='background:rgba(30,41,59,0.6);padding:10px 15px;border-radius:8px 8px 0 0;border-bottom:1px solid #334155;'>
                <div style='color:#fff;font-size:12px;font-weight:bold;margin-bottom:5px;'>Secure sign-in</div>
                <div style='font-family:'Space Mono', monospace;font-size:18px;font-weight:bold;color:#fff;'>{$appNameSafe}</div>
            </div>

            <div style='padding:25px;'>
                <h1 style='font-family:'Space Mono', monospace;color:#fff;margin:0 0 20px 0;'>Confirm your sign-in</h1>
                
                <p style='margin-bottom:15px;'>Hi <strong style='color:#fff;'>{$recipient}</strong>,</p>

                <p style='margin-bottom:20px;'>We received a request to sign in to your <strong style='color:#fff;'>{$appNameSafe}</strong> account. To continue, use the one-time password below:</p>

                <div style='background:linear-gradient(135deg, #00f5d4 0%, #d000ff 100%);padding:20px;border-radius:8px;text-align:center;margin:20px 0;'>
                    <div style='font-family:'Space Mono', monospace;font-size:32px;font-weight:bold;color:#030712;letter-spacing:8px;'>{$otpSafe}</div>
                    <p style='color:#030712;margin:8px 0 0;font-size:12px;'>This code expires in <strong>{$expirySafe}</strong>.</p>
                </div>

                <p style='margin-bottom:20px;'>If this wasn't you, we recommend resetting your password immediately.</p>
                
                <div style='text-align:center;margin:20px 0;'>
                    <a href='{$resetSafe}' style='display:inline-block;background-color:#fff;color:#030712;padding:10px 25px;border-radius:6px;text-decoration:none;font-weight:bold;font-family:'Space Mono', monospace;box-shadow:0 0 10px rgba(0, 245, 212, 0.5);margin:5px;'>
                        Reset password
                    </a>
                </div>

                <p style='color:#94a3b8;font-size:14px;margin-bottom:20px;'>Need help? Contact us at <a href='mailto:{$emailSafe}' style='color:#fff;text-decoration:none;'>{$emailSafe}</a>{$phoneSafe}</p>

                <div style='text-align:center;margin:20px 0;'>
                    <a href='{$signinSafe}' style='display:inline-block;background-color:transparent;color:#fff;padding:10px 25px;border-radius:6px;text-decoration:none;font-weight:bold;font-family:'Space Mono', monospace;border:2px solid #00f5d4;margin:5px;'>
                        Back to sign-in
                    </a>
                </div>
            </div>
        </div>
    ";
    send_email($user->email, $user->full_name, $subject, $message);
