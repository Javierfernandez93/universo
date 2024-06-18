<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}   

$data = HCStudio\Util::getHeadersForWebService();

if(!$data['real_state_id'])
{
    error(JFStudio\Constants::RESPONSES['NOT_PARAM']);
}

if(!(new Site\RealState)->find($data['real_state_id'])->updateStatus($data['status']))
{
    error(JFStudio\Constants::RESPONSES['ERROR_ON_SAVE']);
}

success();