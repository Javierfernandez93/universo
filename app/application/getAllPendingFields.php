<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $BuyPerUser = new Site\BuyPerUser;

    if($BuyPerUser->hasPackageBuy($UserLogin->company_id,Site\Package::MARKETING_BASIC) || $BuyPerUser->hasPackageBuy($UserLogin->company_id,Site\Package::MARKETING_PRO))
    {
        if($marketingFields = (new Site\MarketingFieldPerUser)->getAllPendingTypes($UserLogin->company_id))
        {
            $data["marketingFields"] = $marketingFields;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_FIELDS";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "HAS_NOT_BUY";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_SESSION";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 