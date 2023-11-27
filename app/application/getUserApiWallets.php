<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($wallets = (new Site\UserApi)->getWalletsByUserId($UserLogin->company_id))
    {
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
        $data['wallets'] = $wallets;
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_WALLETS';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 