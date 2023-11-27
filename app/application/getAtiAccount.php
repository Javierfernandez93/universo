<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $data['hasDerivAccount'] = false;

    if($account = $UserLogin->getAtiAccount())
    {
        $data['account'] = $account;
        $data['hasDerivAccount'] = $account['deriv_server'] && $account['deriv_login'];
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_ACCOUNT';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 