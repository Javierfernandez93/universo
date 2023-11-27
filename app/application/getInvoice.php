<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($data['buy_per_user_id'])
	{
        $BuyPerUser = new Site\BuyPerUser;

		if($BuyPerUser->loadWhere('buy_per_user_id = ?',$data['buy_per_user_id']))
		{
			$data['buy_per_user'] = $BuyPerUser->unformatData();
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
		} else {
			$data['s'] = 0;
			$data['r'] = 'NOT_CATALOG_PAYMENT_METHOD_ID';
		}		
	} else {
		$data['s'] = 0;
		$data['r'] = 'NOT_BUY_PER_USER_ID';
	}
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 