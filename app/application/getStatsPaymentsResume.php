<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$PaymentProperty = new Site\PaymentProperty;

success(null,[
    'payments' => [
        $PaymentProperty->getStatsPaymentsResume(1),
        $PaymentProperty->getStatsPaymentsResume(6),
        $PaymentProperty->getStatsPaymentsResume(7),
        $PaymentProperty->getStatsPaymentsResume(8),
    ]
]);