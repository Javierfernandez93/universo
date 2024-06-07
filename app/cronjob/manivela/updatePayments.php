<?php define("TO_ROOT", "../../..");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    if (!isset($_SERVER['SERVER_AUTH_USER'])) {
        unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
    }
    
    if (!isset($_SERVER['SERVER_AUTH_PW'])) {
        unauthorized("NO_PASSWORD_AUTHENTICATION_SENT");
    }
    
    if($_SERVER['SERVER_AUTH_USER'] != $_ENV['SERVER_AUTH_USER']) {
        unauthorized("INVALID_USER");
    }
    
    if($_SERVER['SERVER_AUTH_PW'] != $_ENV['SERVER_AUTH_PW']) { 
        unauthorized("INVALID_PASSWORD");
    }
}

$Api = Manivela\Api::getInstance();
    
$sales = $Api->getSales();

if(!$sales)
{
    unauthorized("NO_SALES_FOUND");
}

$sales = array_values(array_filter($sales,function($sale){
    return $sale['Status_venta'] != 'Finalizado';
}));

$Property = new Site\Property;
$PaymentProperty = new Site\PaymentProperty;
$CatalogPaymentType = new Site\CatalogPaymentType;

foreach($sales as $sale)
{
    if($property_id = $Property->findField('title = ? AND status = 1',$sale['Unidad'],"property_id"))
    {
        if($PaymentProperty->loadWhere('property_id = ? AND payment_number < ? AND status = 1',[$property_id,2]))
        {
            if($catalog_payment_type_id = $CatalogPaymentType->findField('title = ? AND status = 1',$sale['Status_venta'],"catalog_payment_type_id"))
            {
                if($PaymentProperty->catalog_payment_type_id != $catalog_payment_type_id)
                {
                    $PaymentProperty->catalog_payment_type_id = $catalog_payment_type_id;
                    $PaymentProperty->save();
                }
            }
        }
    }
    
}

success(Constants::RESPONSES['DATA_OK']);