<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$loggs = (new Site\Logger)->getAll();

if(!$loggs)
{
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'loggs' => $loggs,
]);