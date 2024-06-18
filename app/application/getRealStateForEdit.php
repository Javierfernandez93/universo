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

$realState = (new Site\RealState)->findRow("real_state_id = ?",[$data['real_state_id']]);

if(!$realState)
{
    error(JFStudio\Constants::RESPONSES['NOT_FIELD_SESSION_DATA']);
}

$realState['sold_out'] = filter_var($realState['sold_out'], FILTER_VALIDATE_BOOLEAN) ? true : false;
$realState['main'] = filter_var($realState['main'], FILTER_VALIDATE_BOOLEAN) ? true : false;

success(null,[
    'realState' => $realState
]); 