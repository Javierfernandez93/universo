<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{   
    $filter = "";

    if($data['filter']['start_date'] != "")
    {
        $data['filter']['start_date'] = strtotime($data['filter']['start_date']);
        $data['filter']['end_date'] = strtotime($data['filter']['end_date']);

        $filter .= " AND commission_per_user.create_date BETWEEN '".$data['filter']['start_date']."' AND '".$data['filter']['end_date']."'";
    }

    if($commissions = (new Site\CommissionPerUser)->getAll($UserLogin->company_id,$filter))
    {
        $data['commissions'] = $commissions;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_DATA";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 