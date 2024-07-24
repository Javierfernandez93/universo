<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged) {    
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

$filter = "";

if($data['filter']['start_date'] != "")
{
    $data['filter']['start_date'] = strtotime($data['filter']['start_date']);
    $data['filter']['end_date'] = strtotime($data['filter']['end_date']);

    $filter .= " AND commission_per_user.create_date BETWEEN '".$data['filter']['start_date']."' AND '".$data['filter']['end_date']."'";
}

$commissions = (new Site\CommissionPerUser)->getAll($UserSupport->getId(),$filter);

if(!$commissions)
{
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'commissions' => $commissions
]);