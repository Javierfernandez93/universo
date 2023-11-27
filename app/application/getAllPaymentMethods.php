<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($catalogPaymentMethods = (new Site\CatalogPaymentMethod)->getAll())
    {
        $data["catalogPaymentMethods"] = format($catalogPaymentMethods);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "NOT_CATALOG_PAYMENT_METHODS";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function format(array $catalogPaymentMethods = null) : array {
    return array_map(function($catalogPaymentMethod){
        $catalogPaymentMethod['additional_data'] = json_decode($catalogPaymentMethod['additional_data']);

        return $catalogPaymentMethod;
    },$catalogPaymentMethods);
}

echo json_encode($data);