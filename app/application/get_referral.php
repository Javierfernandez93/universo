<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if($UserLogin->logged === false || $UserSupport->logged === true)
{
    $data['referral_user_login_id'] = $data['user_login_id'];
    
    if($data['referral_user_login_id'])
    {
        $UserData = new Site\UserData;
        
        if($referral = $UserLogin->getProfile($data['referral_user_login_id']))
        {
            $data['referral'] = $referral;

            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_USER_LOGIN_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 