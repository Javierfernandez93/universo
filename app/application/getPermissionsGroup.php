<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

$data = HCStudio\Util::getHeadersForWebService();

if(!isset($data['code']))
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

$permission_group = $UserSupport->getPermissionsGroup($data['code']);

success(null,[
    'permission_group' => $permission_group
]);
