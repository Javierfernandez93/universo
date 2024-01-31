<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['property_id'])
    {
        if($property = (new Site\Property)->findRow("property_id = ?", $data['property_id']))
        {
            $data["property"] = $property;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_PROPERTY";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_PROPERTIES";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 