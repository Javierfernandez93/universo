<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{   
    if($profits = (new Site\CommissionPerUser)->getAll($UserLogin->company_id))
    {
        $data['profits'] = format($profits);
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

function format(array $profits = null) : array {
    $Package = new Site\Package;
    return array_map(function($profit) use($Package) {
        $profit['package'] = $Package->getPackage($profit['package_id']);
        return $profit;
    },$profits);
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 