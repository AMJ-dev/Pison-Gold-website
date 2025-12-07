<?php
    require_once dirname(__DIR__, 2) . "/include/verify-token.php";
        
    if (empty($_POST['npassword'])) $data = "Please enter your password";   
    elseif($_POST['npassword'] == $_POST['cpassword'])  {  
        $check_pass = $conn->prepare('SELECT `password` FROM users WHERE id=:id');
        $check_pass->execute([':id'=>$my_details->id]);
        $my_password = $check_pass->fetch(PDO::FETCH_ASSOC)['password'];                    
        if (password_verify($_POST['opassword'], $my_password)) {
                $update_pass=$conn->prepare("UPDATE users SET `password`=:my_password WHERE id=:id");
                $update_pass->bindValue("my_password", encrypt_pass($_POST['npassword']));
                $update_pass->bindValue("id", $my_details->id);
                if($update_pass->execute()){
                    $error = false; 
                    $data = "Password Changed Successfully";

                    $subject = "Password Change Confirmation";
                    $message = "
                    <p>Dear {$my_details->full_name}</p>,
                    <p>This email is to confirm that your password has been successfully changed.</p>
                    <p>If you did not authorize this change, please contact our support team immediately at $comp_email.</p>
                    <p>Thank you for keeping your account secure.</p>
                    ";

                    send_email($my_details->email, $my_details->full_name, $subject, $message);
                } 
            }else $data = "Incorrect Password"; 
        } else $data = "Password did not match"; 
        echo json_encode(['error'=>$error, 'data'=>$data]);