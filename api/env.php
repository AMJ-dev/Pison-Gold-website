<?php
    ini_set("display_errors", 1);
    ini_set("display_startup_errors", 1);
    error_reporting(E_ALL);
    // error_reporting(0);
    ob_start();
    // ob_end_clean();
    
    date_default_timezone_set("Africa/Lagos");

    if (session_status() === PHP_SESSION_NONE) session_start();
    $url="localhost/pison-gold";
    $baseURL="http://$url/";
    $db_name = "pison_gold";
    $AppName="Pison-Gold";
    $db_user = "cyberpros";
    $db_pass = "Group2022@"; 
    
    $email_host="mail.pison-gold.com.ng";
    $email_port=465; 
    $email_user="info@pison-gold.com.ng";
    $email_password="Group2022@";
    $sender_email = "info@pison-gold.com.ng";
    $info_email = "sender@pison-gold.com.ng";
    
