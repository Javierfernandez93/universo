<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $CommissionPerUser = new Site\CommissionPerUser;
    
    $data['months'] = $CommissionPerUser->_getProfitsByMonths($UserLogin->company_id);

    if($income = $CommissionPerUser->getAllProfitsByMonths($data['months'],$UserLogin->company_id))
    {
        $data['income'] = $income;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_DATA";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 