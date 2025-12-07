<?php
    require_once dirname(__DIR__, 1).'/include/verify-token.php';
    
    $data = [
        "full_name"=>$my_details->full_name,
        "last_name"=>$my_details->last_name,
        "pics"=>$my_details->pics,
        "email"=>$my_details->email,
    ];
    echo json_encode(["data"=>$data, "error"=>false]);