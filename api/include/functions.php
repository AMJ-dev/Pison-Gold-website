<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

    function encrypt_pass($pass){
        return password_hash($pass, PASSWORD_ARGON2I);
    } 

    function check_login(){
        if(!isset($_SESSION["id"])) no_permision();
    }
    function no_permision(){ 
        header($_SERVER['SERVER_PROTOCOL'] . ' 403 Forbidden');
        echo json_encode(["error"=>true, "data"=>"You don't have enough permission to access this Resources"]);
        die(); 
    }
    function humandate($timestamp){
        return date("F jS, Y", strtotime($timestamp));
    }
    function humandatetime($timestamp){
        return date("F jS, Y h:i A", strtotime($timestamp));
    }
    function get_expires(){
        global $date_time, $otp_expires;
        return date("Y-m-d H:i:s", strtotime("+$otp_expires", strtotime($date_time)));
    }

    function rm_special_char($char){
        return preg_replace("/[^a-zA-Z0-9\.]/", "_", (string)$char);
    }
    
    function gen_filename($filename){
        $file_name = rm_special_char($filename);
        $bytes = bin2hex(random_bytes(5));
        $ext = pathinfo($file_name, PATHINFO_EXTENSION);
        $suffix = substr(pathinfo($file_name, PATHINFO_FILENAME), -8);
        $name = $bytes . "_" . date("Y_m_d_H_i_s") . "_" . $suffix;
        $final = $ext ? "$name.$ext" : $name;
        return "uploads/$final";
    }
    
    function ensure_upload_dir($dir = 'uploads'){
        $abs = dirname(__DIR__, 1) . "/$dir";
        if (!is_dir($abs)) {
            if (!mkdir($abs, 0755, true) && !is_dir($abs)) {
                return [false, "Failed to create upload directory"];
            }
        }
        if (!is_writable($abs)) return [false, "Upload directory is not writable"];
        return [true, $abs];
    }
    
    function php_upload_error_msg($err){
        return match((int)$err){
            UPLOAD_ERR_INI_SIZE   => "File exceeds server limit (upload_max_filesize).",
            UPLOAD_ERR_FORM_SIZE  => "File exceeds form limit (MAX_FILE_SIZE).",
            UPLOAD_ERR_PARTIAL    => "File was only partially uploaded.",
            UPLOAD_ERR_NO_FILE    => "No file was uploaded.",
            UPLOAD_ERR_NO_TMP_DIR => "Missing a temporary folder on server.",
            UPLOAD_ERR_CANT_WRITE => "Failed to write file to disk.",
            UPLOAD_ERR_EXTENSION  => "File upload stopped by a PHP extension.",
            default               => "Unknown upload error."
        };
    }
    
    function upload_pics($file, $maxBytes = 5242880){
        global $image_accepted;
        [$okDir, $dirMsg] = ensure_upload_dir('uploads');
        if (!$okDir) return ["error"=>true, "code"=>"DIR_ERROR", "message"=>$dirMsg];
    
        if (!is_array($file) || !isset($file['error'])) {
            return ["error"=>true, "code"=>"BAD_INPUT", "message"=>"Invalid file payload."];
        }
    
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ["error"=>true, "code"=>"PHP_UPLOAD_ERR", "message"=>php_upload_error_msg($file['error'])];
        }
    
        $size = (int)($file['size'] ?? 0);
        if ($size <= 0) {
            return ["error"=>true, "code"=>"EMPTY_FILE", "message"=>"Empty file or size not set."];
        }
        if ($size > $maxBytes) {
            return ["error"=>true, "code"=>"SIZE_EXCEEDED", "message"=>"File too large. Max ".number_format($maxBytes/1048576, 2)." MB."];
        }
    
        if (!is_uploaded_file($file['tmp_name'])) {
            return ["error"=>true, "code"=>"NOT_UPLOADED", "message"=>"Possible file upload attack detected."];
        }
    
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $serverMime = $finfo ? finfo_file($finfo, $file['tmp_name']) : null;
        if ($finfo) finfo_close($finfo);
        if (!$serverMime) {
            return ["error"=>true, "code"=>"MIME_DETECT_FAIL", "message"=>"Unable to detect file type."];
        }
        if (!in_array($serverMime, $image_accepted, true)) {
            return ["error"=>true, "code"=>"MIME_NOT_ALLOWED", "message"=>"Invalid file format ($serverMime)."];
        }
    
        $target_rel = gen_filename($file['name']);
        $target_abs = dirname(__DIR__, 1) . "/" . $target_rel;
    
        if (!move_uploaded_file($file['tmp_name'], $target_abs)) {
            return ["error"=>true, "code"=>"MOVE_FAILED", "message"=>"Failed to move uploaded file."];
        }
    
        @chmod($target_abs, 0644);
    
        return [
            "error"   => false,
            "code"    => "OK",
            "message" => "Uploaded successfully.",
            "path"    => $target_rel,
            "meta"    => [
                "original_name" => $file['name'],
                "mime"          => $serverMime,
                "size"          => $size
            ]
        ];
    }

    function upload_files($file){
        [$okDir, $dirMsg] = ensure_upload_dir('uploads');
        if (!$okDir) return ["error"=>true, "code"=>"DIR_ERROR", "message"=>$dirMsg];
    
        if (!is_array($file) || !isset($file['error'])) return ["error"=>true, "code"=>"BAD_INPUT", "message"=>"Invalid file payload."];
    
        if ($file['error'] !== UPLOAD_ERR_OK) return ["error"=>true, "code"=>"PHP_UPLOAD_ERR", "message"=>php_upload_error_msg($file['error'])];
    
        $size = (int)($file['size'] ?? 0);
        if ($size <= 0) return ["error"=>true, "code"=>"EMPTY_FILE", "message"=>"Empty file or size not set."];
            
        if (!is_uploaded_file($file['tmp_name'])) return ["error"=>true, "code"=>"NOT_UPLOADED", "message"=>"Possible file upload attack detected."];
                
        $target_rel = gen_filename($file['name']);
        $target_abs = dirname(__DIR__, 1) . "/" . $target_rel;
  
        if (!move_uploaded_file($file['tmp_name'], $target_abs)) {
            return ["error"=>true, "code"=>"MOVE_FAILED", "message"=>"Failed to move uploaded file."];
        }
    
        @chmod($target_abs, 0644);
    
        return [
            "error"   => false,
            "code"    => "OK",
            "message" => "Uploaded successfully.",
            "path"    => $target_rel,
            "meta"    => [
                "original_name" => $file['name'],
                "size"          => $size
            ]
        ];
    }
    
    function verify_otp(){
        global $conn, $date_time, $error, $data;
        $otp = strtoupper($_POST["otp"]); 
        $user_id = isset($_SESSION["reset_id"])?"reset_id":"login_id";
        if(isset($_SESSION[$user_id])){
            $check_otp = $conn->prepare('SELECT time_expire FROM otp WHERE user_id=:user_id && otp=:otp');
            $check_otp->bindValue(':user_id', $_SESSION[$user_id]);
            $check_otp->bindValue(':otp', $otp);
            $check_otp->execute();
            if ($check_otp->rowCount() > 0) {
                $otp_data = $check_otp->fetch(PDO::FETCH_ASSOC);    
                if(strtotime($date_time) < strtotime($otp_data["time_expire"])){  
                    
                    $update_otp = $conn->prepare("UPDATE otp set otp=:otp, time_expire=:time_expire WHERE user_id=:user_id");
                    $update_otp->bindValue(":otp", "");
                    $update_otp->bindValue(":time_expire", "");
                    $update_otp->bindValue(":user_id", $_SESSION[$user_id]);
                    if($update_otp->execute()) $error = false;
                }else $data = "OTP has expired, Please try again later";
            }else $data = "OTP Invalid";
        }
        return ["error"=>$error, "data"=>$data];
    } 
    function send_email($to, $name, $subject, $message, $reply_to="", $reply_name="", $attachment=[]){
        global $baseURL, $AppName, $sender_email, $comp_logo, $email_host, $email_port, $email_user, $email_password;  
   
        $template = file_get_contents(__DIR__."/email/index.tpl");
        $template = str_replace("<!-- #{AppName} -->", $AppName, $template);
        $template = str_replace("<!-- #{comp_logo} -->", $comp_logo, $template);
        $template = str_replace("<!-- #{baseURL} -->", $baseURL, $template);
        $template = str_replace("<!-- #{message} -->", $message, $template);
        $template = str_replace("<!-- #{email_user} -->", $email_user, $template);
        $template = str_replace("<!-- #{date_year} -->", date("Y"), $template);
       
        try {
            $mail = new PHPMailer(true);             
            $mail->isSMTP();      
            $mail->Mailer = "smtp";                                      
            $mail->SMTPAuth=true;                                            
            $mail->SMTPKeepAlive=true;                                
            $mail->SMTPSecure = "ssl"; 
            $mail->CharSet = "UTF-8";
            $mail->Encoding = "base64";                                            
            $mail->Host       = $email_host;                    
            $mail->Port       = $email_port;                
            $mail->Username   = $email_user;                    
            $mail->Password   = $email_password; 
            $mail->Sender = $sender_email;    
            $mail->From     = $email_user;
            $mail->FromName = $AppName;                         
            $mail->Subject = $subject;
            $mail->Body    = $template;
            $mail->addAddress($to, $name);
            
            if(!empty($reply_to)) $mail->addReplyTo($reply_to, $reply_name);  
            else $mail->addReplyTo($email_user, $AppName);
            if (is_array($attachment) && isset($attachment['path']) && file_exists($attachment['path'])) {
                $name = isset($attachment['name']) ? $attachment['name'] : basename($attachment['path']);
                $mail->addAttachment($attachment['path'], $name);
            }
            $mail->isHTML(true);
            try {
                $is_send = $mail->send();
                $mail->clearAddresses();
                $mail->clearAttachments();
                $mail->clearAllRecipients();
                $mail->clearCustomHeaders();
                return $is_send;
            } catch (\Throwable $th) {
                //throw $th;
            }
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }

    function delete_file($file){
        if(!empty($file)){
            $file_location=dirname(__DIR__, 1)."/".$file;
            try {
                if (file_exists($file_location)) unlink($file_location);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }   
    function rand_id(){
        return rand(3000, 4500000);
    } 
    function gen_link_code(){
        return bin2hex(openssl_random_pseudo_bytes(200));
    }
    function gen_token(){
        $keyLength = rand(55, 155);
        $iterations = rand(2000, 10000);
        $data=generate_uuid()."-".uniqid();
        $generated_key=openssl_pbkdf2($data, gen_random_strings(), $keyLength, $iterations, "sha256");
        return base64_encode($generated_key);
    }
    function generate_uuid($uid="%04x%04x%04x-%04x%04x-%04x%04x-%04x%04x-%04x%04x%04x") {
        return sprintf($uid,
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xffff ), mt_rand( 0, 0xff4B ),
            mt_rand( 0, 0xffff ), mt_rand( 0, 0xff4B ), mt_rand( 0, 0xff4B ),
            mt_rand( 0, 0x0C2f ) | 0x4000, mt_rand( 0, 0x3fff ) | 0x8000,
            mt_rand( 0, 0xff4B ), mt_rand( 0, 0x2Aff ), mt_rand( 0, 0xffD3 ), mt_rand( 0, 0xff4B )
        );   
    }
    function gen_random_strings(){
        return bin2hex(openssl_random_pseudo_bytes(rand(15, 80)));
    } 
    function generate_reset_link(){
        return bin2hex(openssl_random_pseudo_bytes(100));
    }
    function generate_otp(){
        $digits = '';
        for ($i = 0; $i < 6; $i++) $digits .= random_int(0, 9);
        return $digits;
    }
    function gen_password(){
        return bin2hex(openssl_random_pseudo_bytes(8));
    }
    function get_user($user_id, $sel="*"){
        global $conn;
        $user = "";
        $get_user = $conn->prepare("SELECT $sel FROM users WHERE id=:id");
        $get_user->execute([":id"=>$user_id]);
        if($get_user->rowCount()>0){
            $user = $get_user->fetch(PDO::FETCH_OBJ);
            unset($user->passord);
        }
        return $user;
    }
    function send_otp($user_id, $email, $full_name){ 
        global $conn, $date_time;
        $otp = generate_otp();
        
        $message = "Your verification code is $otp. Please, don\'t disclose this to anyone.";
        send_email($email, $full_name, strtoupper("email verification"), $message);

        $save_otp=$conn->prepare("UPDATE otp SET otp=:otp, date_time=:date_time WHERE user_id=:user_id");
        $save_otp->bindValue(':otp', $otp); 
        $save_otp->bindValue(':date_time', $date_time);
        $save_otp->bindValue(':user_id', $user_id); 
        return $save_otp->execute();
    }
    function hide_email($email){
        $em   = explode("@", strtolower($email));
        $name = implode('@', array_slice($em, 0, count($em) - 1));
        if(strlen($name)==1) return   '*'.'@'.end($em);
        $len  = floor(strlen($name)/2);
        return substr($name,0, $len) . str_repeat('*', $len) . "@" . end($em);
    }