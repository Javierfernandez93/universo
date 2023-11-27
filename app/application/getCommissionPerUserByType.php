<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    $filter = "";

    if($data['catalog_commission_type_id'] ?? false)
    {
        $filter = " AND commission_per_user.catalog_commission_type_id IN ({$data['catalog_commission_type_id']})";
    }

    if($commissions = (new Site\CommissionPerUser)->getAll($UserLogin->company_id,$filter))
    {
        $data['active'] = (new Site\BuyPerUser)->isActive($UserLogin->company_id);
        $data['commissions'] = $commissions;
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_COMMISSIONS';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 