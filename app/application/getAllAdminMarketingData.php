<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('list_marketing'))
    {
        if($marketingData = (new Site\MarketingFieldPerUser)->getAllPendingTypesAdmin($data['company_id'] ?? false))
        {
            $data["marketingData"] = $marketingData;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_USERS";
        }	
    } else {
        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 