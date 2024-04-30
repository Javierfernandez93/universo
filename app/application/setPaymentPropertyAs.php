<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->hasPermission('add_client'))
{
    error(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$data['payment_property_id'])
{
    error('NOT_PAYMENT_PROPERTY_ID');
}

if(!isset($data['status']))
{
    error('NOT_STATUS');
}

if(!(new Site\PaymentProperty)->find($data['payment_property_id'])->updateStatus($data['status']))
{
    error('NOT_CHANGED');
}

success(Constants::RESPONSES['DATA_OK']);