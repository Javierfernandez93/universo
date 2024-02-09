<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(isset($data['commission_per_user_id']))
    {
        if($commission = (new Site\CommissionPerUser)->findRow("commission_per_user_id = ?",$data['commission_per_user_id']))
        {
            JFStudio\Mailer::send([
                'view' => 'commission',
                'subject' => "Felicidades, recibiste una nueva comisión",
                'vars' => [
                    // 'email' => (new Site\UserLogin)->getEmail($commission['user_login_id']),
                    'email' => 'javier.fernandez.pa93@gmail.com',
                    'names' => (new Site\UserLogin)->getNames($commission['user_login_id']),
                    'company_name' => Site\SystemVar::_getValue("company_name")
                ],
            ]);  
        } else {
            $data['r'] = "NOT_COMMISSION";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_FEEDBACK";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 