<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!$data['email'])
{
    error('EMAIL_REQUIRED');
}

if(!$data['user_login_id'])
{
    error('USER_LOGIN_ID_REQUIRED');
}

$Api = Manivela\Api::getInstance();
$users = $Api->getSales();

// search user in $users from $data['email']
$users = array_filter($users, function($user) use ($data) {
    return $user['Correo'] === $data['email'];
});

if(!count($users))
{
    error('NOT_USER',null,true);
}

$users = array_values($users);

Site\UserAccount::setOnManivela($data['user_login_id']);

success(Constants::RESPONSES['DATA_OK'],[
    'user' => $users[0]
]);
