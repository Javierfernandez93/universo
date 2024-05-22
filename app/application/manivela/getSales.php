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

success(Constants::RESPONSES['DATA_OK'],[
    'users' => $users
]);
