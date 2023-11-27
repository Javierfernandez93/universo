<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['secret'])
{
    if($data['email'])
    {
        $UserLogin = new Site\UserLogin(false,false);
    
        if($UserLogin->isValidSecret($data['secret'],$data['email']))
        {
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_BUYS";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_EMAIL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_SECRET";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 