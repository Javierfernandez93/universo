<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $WithdrawPerUser = new Site\WithdrawPerUser;
    
    $data['status'] = $data['status'] ?? 1;

    $filter = " WHERE withdraw_per_user.status = '{$data['status']}'";
    
    if($transactions = $WithdrawPerUser->getAll($filter))
    {
        $data["transactions"] = $transactions;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_WITHDRAWS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 