<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!$UserSupport->deleteUsers($data['user_login_ids']))
{
    error(JFStudio\Constants::RESPONSES['ERROR_ON_SAVE']);
}

success();