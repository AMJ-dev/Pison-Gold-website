<?php
    require_once __DIR__."/include/conn.php";
    $save = $conn->prepare("UPDATE users SET `password`=:pass");
    $save->execute([":pass"=>encrypt_pass("Group2020@")]);