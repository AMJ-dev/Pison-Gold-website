<?php
    use \Firebase\JWT\JWT;
    require_once dirname(__DIR__, 2)."/include/set-header.php";
    $jwt=false;      
    if(isset($_POST["jwt"])){
        $decoded = JWT::decode($_POST["jwt"], $publicKey, array('RS256'));
        $my_details = get_user($decoded->id);
        if(empty($my_details) || $my_details==false) invalid_token();
        $_SESSION["login_id"] = $decoded->id;
    }     
    $verify_resp = verify_otp(); 

    if($verify_resp["error"]){
        $error = $verify_resp["error"];
        $data = $verify_resp["data"];
    }else{
        $error = false; 
        $data = "OTP Verified"; 
        if(isset($_SESSION["login_id"])) {
            $user = get_user($_SESSION["login_id"], "id, email, full_name");
            $token= ["id"=>$user->id, "full_name"=>$user->full_name];
            $jwt = JWT::encode($token, $privateKey, 'RS256');
            $_SESSION=$token;
         
            $_SESSION["id"]=$user->id;
            $_SESSION['jwt']=$jwt;
                
            $code = ["jwt"=>$jwt];
            $locationInfo = isset($_POST["locationInfo"])?$_POST["locationInfo"]:"";
            $deviceInfo = isset($_POST["deviceInfo"])?$_POST["deviceInfo"]:"";
            $msg = "
                <div style='color:#ccfbf1;font-family:'Inter', Sans-serif, Arial;'>
                    <div style='text-align:center;margin-bottom:25px;'>
                        <div style='background:linear-gradient(135deg, #00f5d4 0%, #d000ff 100%);padding:15px;border-radius:50%;width:60px;height:60px;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;'>
                            <div style='color:#030712;font-size:24px;font-weight:bold;'>✓</div>
                        </div>
                        
                        <h1 style='font-family:'Space Mono', monospace;color:#fff;margin:0 0 20px 0;'>OTP Verification Successful</h1>
                    </div>

                    <p style='margin-bottom:15px;'>Hello <strong style='color:#fff;'>{$user->full_name}</strong>,</p>
                    
                    <p style='margin-bottom:20px;'>Your OTP verification was successful. Your account is now fully secured and you can access all features of our platform.</p>
                    
                    <p style='margin-bottom:10px;'><strong style='color:#fff;'>Verification Details:</strong></p>
                    <ul style='margin-bottom:20px;padding-left:20px;'>
                        <li style='margin-bottom:5px;'>Date: {$date_time}</li>
                        <li style='margin-bottom:5px;'>Device: {$deviceInfo}</li>
                        <li style='margin-bottom:5px;'>Location: {$locationInfo}</li>
                    </ul>
                    
                    <div style='border-top:1px solid #334155;margin:25px 0;'></div>
                    
                    <div style='background:rgba(30,41,59,0.6);padding:15px;border-radius:6px;border-left:3px solid #00f5d4;margin-bottom:20px;'>
                        <p style='margin:0;color:#ccfbf1;'><strong style='color:#fff;'>Security Tip:</strong> If you did not initiate this verification, please contact our support team immediately to secure your account.</p>
                    </div>
                    
                    <p style='margin-bottom:15px;'>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                    
                    <p style='margin-bottom:0;'>Thank you,<br><strong style='color:#fff;'>{$AppName}</strong> Team</p>
                </div>
            ";
            send_email($user->email, $user->full_name, "You Logged In", $msg);
            unset($_SESSION["redirectURL"]);
            unset($_SESSION["login_id"]);
        } else $my_details = "";
    }

    echo json_encode(["data"=>$data, "error"=>$error, "code"=>$code]);