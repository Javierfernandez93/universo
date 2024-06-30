<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['catalog_payment_type_id']))
{
    error(Constants::RESPONSES['NOT_PARAM']);
}

success(null,[
    'payment' => (new Site\PaymentProperty)->getPaymentResumeExtend($data['catalog_payment_type_id'])
]);