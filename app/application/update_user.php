<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user']['user_login_id'])
    {
        if((new Site\UserLogin(false,false))->updateUser($data['user']))
        {   
            $data['s'] = 1;
            $data['r'] = 'LOGGED_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'ERROR_ON_SIGNUP';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_USER_LOGIN_ID';
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 