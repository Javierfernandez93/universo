<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

success(null,[
    'payments' => [
        $UserSupport->getStatsPaymentsResume(1),
        $UserSupport->getStatsPaymentsResume(6),
        $UserSupport->getStatsPaymentsResume(7),
        $UserSupport->getStatsPaymentsResume(8),
    ]
]);