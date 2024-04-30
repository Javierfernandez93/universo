<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $filter = "";

    if(isset($data['catalog_payment_type_id']))
    {
        $filter = "AND catalog_payment_type.catalog_payment_type_id = '{$data['catalog_payment_type_id']}'";
    }

    if($payments = (new Site\PaymentProperty)->getPayments($filter))
    {
        $data["payments"] = $payments;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_PAYMENTS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 