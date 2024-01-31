<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($data['company_id'])
    {
        if($user = $UserLogin->getUserForEdit($data['company_id'])) 
        {
            $data["user"] = $user;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data['r'] = "NOT_LOADED";
            $data['s'] = 0;    
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 