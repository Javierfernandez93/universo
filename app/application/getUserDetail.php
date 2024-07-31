<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;
$UserLogin = new Site\UserLogin;

if($UserSupport->logged === true || $UserLogin->logged === true)
{
    if(isset($data['user_login_id']))
    {
        if($user = $UserSupport->getUserDetail($data['user_login_id']))
        {
            $data["user"] = $user;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data['r'] = "DATA_ERROR";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_USER_LOGIN_ID";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 