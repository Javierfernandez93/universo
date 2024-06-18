<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!$data['realState']) {
    error(JFStudio\Constants::RESPONSES['INVALID_DATA']);
}

$data['realState']['sold_out'] = filter_var($data['realState']['sold_out'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
$data['realState']['main'] = filter_var($data['realState']['main'], FILTER_VALIDATE_BOOLEAN) ? 1 : 0;

if(!Site\RealState::add($data['realState']))
{
    error(JFStudio\Constants::RESPONSES['ERROR_ON_SAVE']);
}

success();    