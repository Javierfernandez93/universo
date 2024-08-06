<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->hasPermission('add_client'))
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$data['payment_property_id']) {
    error('NOT_PAYMENT_PROPERTY_ID');
}

$data['payment_property'] = (new Site\PaymentProperty)->findRow("payment_property_id = ?",$data['payment_property_id']);

if(!$data['payment_property']['property_id']) {
    error('NOT_PROPERTY_ID');
}

$data['property'] = (new Site\Property)->findRow("property_id = ?",$data['payment_property']['property_id']);

// sanitize data
$data['property']['extension'] = $data['property']['extension'] ? 'true' : 'false';
$data['property']['promotion'] = $data['property']['promotion'] ? 'true' : 'false';
$data['property']['extension_date'] = $data['property']['extension_date'] ? date("Y-m-d",$data['property']['extension_date']) : 0;

$data['payment_property']['start_date'] = $data['payment_property']['start_date'] ? date("Y-m-d",$data['payment_property']['start_date']) : 0;
$data['payment_property']['end_date'] = $data['payment_property']['end_date'] ? date("Y-m-d",$data['payment_property']['end_date']) : 0;

$data['seller'] = [
    'user_login_id' => (new Site\UserReferral)->findField("user_login_id = ?",$data['payment_property']['user_login_id'], 'referral_id'),
];

if(isset($data['d']))
{
    d($data);
}

success(Constants::RESPONSES['DATA_OK'],$data);