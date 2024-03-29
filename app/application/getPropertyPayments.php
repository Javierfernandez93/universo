<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['property_id'])
    {
        if($payments = (new Site\PullProperty)->findAll("property_id = ?",$data['property_id']))
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
        $data["r"] = "NOT_PAYMENTS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 