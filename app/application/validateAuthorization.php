<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['token']) === true)
    {
        if(isset($data['key']) === true)
        {
            
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_ITEM_ID';
        }	
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_USER_API_ID';
    }	
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 