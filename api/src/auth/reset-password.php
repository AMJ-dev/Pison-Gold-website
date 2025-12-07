<?php
    require_once dirname(__DIR__, 2)."/include/set-header.php";
    if($_POST["where"] == "send-link"){
        $check_user = $conn->prepare("SELECT id, full_name FROM users WHERE email=:email");
        $check_user->execute([":email"=>strtolower($_POST["email"])]);
        if($check_user->rowCount()>0){
            $user = $check_user->fetch(PDO::FETCH_OBJ);
            
            $link1 = generate_reset_link();
            $link2 = generate_reset_link();
            $update_link = $conn->prepare("UPDATE password_reset SET link1=:link1, link2=:link2, time_expires=:time_expires WHERE user_id=:user_id");
            $update_link->bindValue(":link1", $link1);
            $update_link->bindValue(":link2", $link2);
            $update_link->bindValue(":time_expires", get_expires());
            $update_link->bindValue(":user_id", $user->id);
            if($update_link->execute()){
                $error =false;
                $data = "Email Sent Successfully";
                $my_details = $user->id;
                $request_method = "post";
                
                $reset_link = $baseURL."confirm-password/$link1/$link2";
                $subject = "Verify your email address";
                $message = "                
                    <div style='color:#ccfbf1;font-family:'Inter', Sans-serif, Arial;'>
                        <h4 style='color:#fff;margin-bottom:15px;'>Hi {$user->full_name},</h4>
                        
                        <p style='margin-bottom:20px;'>
                            You recently requested to reset the password for your 
                            <strong style='color:#fff;'>{$AppName}</strong> account. 
                            Click the button below to proceed.
                        </p>
                        
                        <div style='text-align:center;margin:25px 0;'>
                            <a href='{$reset_link}' style='display:inline-block;background-color:#fff;color:#030712;padding:12px 30px;border-radius:6px;text-decoration:none;font-weight:bold;font-family:'Space Mono', monospace;box-shadow:0 0 15px rgba(0, 245, 212, 0.5);'>
                                RESET PASSWORD
                            </a>
                        </div>
                        
                        <p style='margin-bottom:15px;'>You can also copy the text below into your browser if you are having problems with the button.</p>
                        
                        <div style='background:rgba(30,41,59,0.6);padding:12px;border-radius:6px;border:1px solid #334155;margin-bottom:20px;word-break:break-all;'>
                            <a href='{$reset_link}' style='color:#fff;text-decoration:none;'>{$reset_link}</a>
                        </div>
                        
                        <p style='margin-bottom:0;'>
                            If you did not request a password reset, 
                            please ignore this email or reply to let us know. 
                            This password reset link is only valid for the next <strong style='color:#fff;'>{$otp_expires}</strong>.
                        </p>
                    </div>
                ";
                send_email($_POST["email"], "Admin", $subject, $message);
            }
        }else $data = "Email doesnt exist";
    }elseif($_POST["where"] == "reset-link"){     
        $check_link = $conn->prepare("SELECT user_id, time_expires FROM password_reset WHERE link1 = :link1 && link2 = :link2");
        $check_link->bindValue(":link1", $_POST["link1"]);
        $check_link->bindValue(":link2", $_POST["link2"]);
        $check_link->execute();
        if($check_link->rowCount()>0){
            $user = $check_link->fetch(PDO::FETCH_OBJ); 
            if(strtotime($date_time) < strtotime($user->time_expires)){
                if($_POST["password"] != $_POST["cpassword"]) $data = "password did not match";
                else{
                    $update_password = $conn->prepare("UPDATE users SET `password`=:user_pass WHERE id=:user_id");
                    $update_password->bindValue(":user_pass", encrypt_pass($_POST["password"]));
                    $update_password->bindValue(":user_id", $user->user_id);
                    if($update_password->execute()){
                        $error = false; 
                        $data = "Your password has been reset";
                        $empty_link = $conn->prepare("UPDATE password_reset SET link1=:link1, link2=:link2, time_expires=:time_expires WHERE user_id=:user_id");
                        $empty_link->bindValue(":link1", "");
                        $empty_link->bindValue(":link2", "");
                        $empty_link->bindValue(":time_expires", "");
                        $empty_link->bindValue(":user_id", $user->user_id);
                        $empty_link->execute();
                        $me = get_user($user->user_id, "full_name, email");
                        $message = "
                            <div style='color:#ccfbf1;font-family:'Inter', Sans-serif, Arial;'>
                                <h1 style='font-family:'Space Mono', monospace;color:#fff;margin:0 0 20px 0;'>Your password has been reset</h1>
    
                                <p style='margin-bottom:20px;'>
                                    The password for your <strong style='color:#fff;'>{$AppName}</strong> account has been successfully reset.
                                </p>
    
                                <div style='background:rgba(30,41,59,0.6);padding:15px;border-radius:6px;border-left:3px solid #00f5d4;'>
                                    <p style='margin:0;color:#ccfbf1;'>
                                        If you did not reset your password, 
                                        please contact our support team 
                                        <a href='mailto:{$email_user}' style='color:#fff;text-decoration:none;'>here</a>.
                                    </p>
                                </div>
                            </div>
                        ";
                        send_email($me->email, $me->full_name, $data, $message);
                    }
                }
            }else $data = "Link expired, Please try again";
        }
    }
    echo json_encode(["data"=>$data, "error"=>$error]);