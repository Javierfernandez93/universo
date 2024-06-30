<?php define("TO_ROOT", "../../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(Constants::RESPONSES['INVALID_PERMISSION']);
}

$Api = Manivela\Api::getInstance();
$users = $Api->getSales();

if(!$users)
{
    error('NOT_SALES');
}

Site\Logger::add([
    'method' => 'request',
    'field' => '',
    'action' => 'api_request',
    'value' => json_encode([
        'users' => count($users)
    ]),  
    'user_support_id' => $UserSupport->getId(),
    'create_date' => time(),
]);

success(Constants::RESPONSES['DATA_OK'],[
    'users' => $users
]);
