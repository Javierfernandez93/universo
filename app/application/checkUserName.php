<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['landing'])
{
    $UserLogin = new Site\UserLogin(false,false);
    
    if($UserLogin->isUniqueLanding($data['landing']))
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_UNIQUE";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_LANDING";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 