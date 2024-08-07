<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
}

if(!isset($data['email']))
{
    error('EMAIL_REQUIRED');
}

if(!isset($data['user_login_id']))
{
    error('USER_LOGIN_ID_REQUIRED');
}

if(!isset($data['title']))
{
    error('TITLE_REQUIRED');
}

$Api = Manivela\Api::getInstance();
$users = $Api->getSales();

// search user in $users from $data['email']
$users = array_filter($users, function($user) use ($data) {
    return $user['Correo'] === $data['email'];
});

if(!count($users))
{
    error('NOT_USER');
}

$users = array_values($users);

// search payment in $users from $data['title']
$payments = array_filter($users, function($user) use ($data) {
    return $user['Unidad'] === $data['title'];
});

if(!count($payments))
{
    error('NOT_PAYMENTS');
}

$payments = array_values($payments);

d($payments);

Site\PaymentProperty::setOnManivela($data['user_login_id']);

success(Constants::RESPONSES['DATA_OK'],[
    'user' => $users[0]
]);
