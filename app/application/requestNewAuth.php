<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['requestQuery']) === true)
    {
        $data['user_login_id'] = $UserLogin->company_id;

        if($token = Site\AuthorizationPerUser::requestNewAuth($data))
        {
            $data['token'] = $token;
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_TOKEN';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_DOCUMENTATION_ID';
    }	   
} else {
    $data['status'] = Site\UserApiCodes::INVALID_CREDENTIALS;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));