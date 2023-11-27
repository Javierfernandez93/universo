<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($templates = (new Site\Template)->getAll($UserLogin->company_id))
    {
        $data['templates'] = $templates;
        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_CAMPAIGNS';
        $data['s'] = 1;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 