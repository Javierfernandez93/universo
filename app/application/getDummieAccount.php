<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($account = $UserLogin->getDummieAccount())
    {   
        if($loginUrl = $UserLogin->generateDummieLoginToken())
        {
            $data['account'] = $account;
            $data['account']['loginUrl'] = $loginUrl;
    
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_LOGIN_URL';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_ACCOUNT';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 