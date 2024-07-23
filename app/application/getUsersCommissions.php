<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$filter = isset($data['status']) ? " WHERE commission_per_user.status = '{$data['status']}'" : "";

$commissions = (new Site\CommissionPerUser)->getAllWithData($filter);

if(!$commissions) {
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'commissions' => $commissions
]);