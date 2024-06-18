<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if(!$UserLogin->logged)
{
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

if(!$data['user']['user_login']['email'])
{
    error(JFStudio\Constants::RESPONSES['INVALID_DATA']);
}

$data['user']['user_login']['user_login_id'] = isset($data['user']['user_login']['user_login_id']) && !empty($data['user']['user_login']['user_login_id']) ? $data['user']['user_login']['user_login_id'] : 0;

if(!$UserLogin->isUniqueMail($data['user']['user_login']['email']) && !$data['user']['user_login']['user_login_id'])
{
    error('MAIL_ALREADY_EXISTS');
}

if(!$UserLogin->isUniqueLanding($data['user']['user_account']['landing']))
{
    error('USER_NAME_EXIST');
}

// sanitize data
$data['user']['user_contact']['phone'] = HCStudio\Util::getNumbers($data['user']['user_contact']['phone']);
$data['user']['user_login']['email'] = strtolower($data['user']['user_login']['email']);
$data['user']['user_referral']['user_login_id'] = $UserLogin->company_id; 

$user_login_id = $UserLogin->doSignup($data['user']);

if(!$user_login_id)
{   
    error('ERROR_ON_SIGNUP');
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],[
    'user_login_id' => $user_login_id
]);