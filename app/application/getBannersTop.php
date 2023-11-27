<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($Wallet = BlockChain\Wallet::getWallet($UserLogin->company_id))
    {
        $PrintPerBanner = new Site\PrintPerBanner;
        
        $data['banners'][] = $PrintPerBanner->getNextBanner($UserLogin->company_id,Site\CatalogBanner::TOP_LEFT);
        $data['banners'][] = $PrintPerBanner->getNextBanner($UserLogin->company_id,Site\CatalogBanner::TOP_RIGHT);

        $data['r'] = 'DATA_OK';
        $data['s'] = 1;
    } else {
        $data['r'] = 'NOT_WALLET';
        $data['s'] = 1;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 