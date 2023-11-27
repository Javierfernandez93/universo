<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($networkInfo = $UserLogin->getNetworkInfo())
    {
        $data['networkInfo'] = $networkInfo ?? false;
        
        if($UserLogin->company_id == 1)
        {
            $data['networkInfo'] = [
                'directs' => 1420,
                'total' => 1420
            ];
        } 
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_NETWORKINFO';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 