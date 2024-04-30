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

if(!$data['catalog_payment_type_id'])
{
    error('NOT_CATALOG_PAYMENT_TYPE_ID');
}

if(!(new Site\PaymentProperty)->find($data['payment_property_id'])->updateField('catalog_payment_type_id',$data['catalog_payment_type_id']))
{
    error('NOT_CHANGED');
}

success(Constants::RESPONSES['DATA_OK']);