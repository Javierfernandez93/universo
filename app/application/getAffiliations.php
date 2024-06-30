<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}   

success(null,[
    'affiliations' => (new Site\Affiliation)->findAll("status != ?",[-1])
]);