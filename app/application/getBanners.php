<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;
$UserLogin = new Site\UserLogin;

if($UserSupport->logged === true || $UserLogin->logged === true)
{	
    if($banners = (new Site\Banner)->findAll("status != ?",-1))
    {
        $data['banners'] = $banners;
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_BANNERS';
        $data['s'] = 1;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 