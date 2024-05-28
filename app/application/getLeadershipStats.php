<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],[
    'leadersStats' => $UserSupport->getLeadershipStats()
]);