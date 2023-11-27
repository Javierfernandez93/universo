<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($data['company_id'])
    {   
        $data["balance"] = 0;

        if($network = $UserLogin->getNetworkChild($data['company_id']))
        {
            if($balance = Site\UserBridgeAccount::getNetworkBalance($network))
            {
                $data["balance"] = $balance;
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_BALANCE";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_NETWORK";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_COMPANY_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 