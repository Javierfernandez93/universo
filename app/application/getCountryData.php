<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(isset($data['country']))
    {
        if(($country = (new World\Country)->getCountryDataByInternet($data['country'])))
        {
            $data['country'] = $country;
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_COUNTRY';
            $data['s'] = 0;
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_COUNTRY';
    }	
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data));