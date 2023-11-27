<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $data['start'] = isset($data['start']) && !empty($data['start']) ? $data['start'] : date('Y-m-01 00:00:00');
    $data['end'] = isset($data['end']) && !empty($data['end']) ? $data['end'] : date('Y-m-t 23:59:59');

    if($commissions = $UserSupport->getAdminUserGains($data))
    {
        $data['start'] = date("Y-m-d",strtotime($data['start']));
        $data['end'] = date("Y-m-d",strtotime($data['end']));
        
        $data['commissions'] = $commissions;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_COMMISSIONS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode($data);