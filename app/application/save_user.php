<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

if(!$data['user']['user_login']['email']) {
    error(JFStudio\Constants::RESPONSES['INVALID_DATA']);
}


$UserLogin = new Site\UserLogin(false,false);

if(!isset($data['user']['user_login']['user_login_id']))
{
    if(!$UserLogin->isUniqueMail($data['user']['user_login']['email'],$data['user']['user_login']['catalog_user_type_id']))
    {
        error('MAIL_ALREADY_EXISTS');
    }
    
    if(!$UserLogin->isUniqueLanding($data['user']['user_account']['landing']))
    {
        error('USER_NAME_EXIST');
    }
}

$user_login_id = $UserLogin->doSignup($data['user']);

if(!$user_login_id)
{   
    error('ERROR_ON_SIGNUP');
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],[
    'user_login_id' => $user_login_id
]);