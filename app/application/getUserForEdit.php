<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;
$UserLogin = new Site\UserLogin;

if(!$UserSupport->logged === true && $UserLogin->logged === true)
{
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

if(!$data['user_login_id'])
{
    error(JFStudio\Constants::RESPONSES['INVALID_DATA']);
}

$user = $UserSupport->getUserToEdit($data['user_login_id']);

if(!$user)
{
    error(JFStudio\Constants::RESPONSES['NOT_FOUND']);
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],[
    'user' => $user
]);