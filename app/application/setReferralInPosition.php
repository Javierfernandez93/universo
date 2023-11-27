<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
	if(isset($data['user_login_id']))
    {
        if(isset($data['side']))
        {
            if($UserLogin->insertReferralOnSide([
                'user_login_id' => $data['user_login_id'],
                'side' => $data['side'],
            ]))
            {
                $data['r'] = 'DATA_OK';
                $data['s'] = 1;
            } else {
                $data['r'] = 'NOT_INSERTED';
                $data['s'] = 1;
            }
        } else {
            $data['r'] = 'NOT_SIDE';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_USER_LOGIN_ID';
	    $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 