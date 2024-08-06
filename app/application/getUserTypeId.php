<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized();
}

success(null,[
    'user_type_id' => $UserSupport->catalog_support_type_id
]);