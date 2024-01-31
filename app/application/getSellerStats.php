<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{   
    $data['stats'] = [
        'total' => [
            'commissions' => (new Site\CommissionPerUser)->sumWhere("user_login_id = ? AND status = ?",[$UserLogin->company_id,1],"amount"),
            'clients' => $UserLogin->getClientsCount(),
            'leads' => $UserLogin->getLeadsCount(),
        ]
    ];
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 