<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['payment_property_id'])) {
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

$payment_property_id = Site\PaymentProperty::duplicateById($data['payment_property_id']);

if(!$payment_property_id) {
    error('NOT_DUPLICATE');
}

success(null,[
    'payment_property_id' => $payment_property_id
]);