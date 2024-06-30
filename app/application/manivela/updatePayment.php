<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

if(!isset($data['email']))
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

if(!isset($data['title']))
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

$Api = Manivela\Api::getInstance();
    
$sales = $Api->getSales();

if(!$sales)
{
    unauthorized("NO_SALES_FOUND");
}

$sales = array_values(array_filter($sales,function($sale) use($data){
    return $sale['Correo'] == $data['email'] && $sale['Unidad'] == $data['title'];
}));

if(!$sales)
{
    error("NO_SALES_FOUND",null,true);
}

$sale = $sales[0];

$Property = new Site\Property;
$PaymentProperty = new Site\PaymentProperty;
$CatalogPaymentType = new Site\CatalogPaymentType;

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

success(Constants::RESPONSES['DATA_OK']);