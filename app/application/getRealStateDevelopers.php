<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)  {
    unauthorized();
}

$real_state_developers = (new Site\RealStateDeveloper)->findAll("status = ?",1);

if(!$real_state_developers) {
    error(Constants::RESPONSES['NOT_FOUND']);
}   

success(null,[
    'real_state_developers' => $real_state_developers
]);