<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(Site\UserAti::addDerivAccount([
        'user_login_id' => $UserLogin->company_id,
        'deriv_server' => $data['deriv_server'],
        'deriv_login' => $data['deriv_login']
    ]))
    {   
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_SAVE_DERIV_ACCOUNT';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 