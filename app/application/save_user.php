<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{   
    if($data['user']['user_login']['email'])
    {
        $UserLogin = new Site\UserLogin(false,false);

        if($UserLogin->isUniqueMail($data['user']['user_login']['email']))
        {
            if($UserLogin->isUniqueLanding($data['user']['user_account']['landing']))
            {
                if($user_login_id = $UserLogin->doSignup($data['user']))
                {   
                    $data['s'] = 1;
                    $data['r'] = 'DATA_OK';
                } else {
                    $data['s'] = 0;
                    $data['r'] = 'ERROR_ON_SIGNUP';
                }
            } else {
                $data['s'] = 0;
                $data['r'] = 'USER_NAME_EXIST';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'MAIL_ALREADY_EXISTS';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_EMAIL';
    }
} else {
    $data['s'] = 0;
    $data['r'] = 'NOT_FIELD_SESSION_DATA';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 