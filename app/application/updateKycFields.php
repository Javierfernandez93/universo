<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($data['user_kyc'])
	{
        if(Site\UserKyc::updateKycFields($data['user_kyc']))
        {
            $data['r'] = 'SAVE_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_FILES';
            $data['s'] = 0;
        }
	} else {
		$data['r'] = 'NOT_FILES';
		$data['s'] = 0;
	}
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));  