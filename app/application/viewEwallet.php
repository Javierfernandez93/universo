<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('view_ewallet') === true)
    {
        if($data['user_login_id'])
        {
            if($Wallet = BlockChain\Wallet::getWallet($data['user_login_id']))
            {
                $data['ewallet'] = $Wallet->attr();
                $data['ewallet']['amount'] = $Wallet->getBalance();
                $data['ewallet']['link'] = (new Site\ShortUrl)->getLink($Wallet);
    
                $data['r'] = 'DATA_OK';
                $data['s'] = 1;
            } else {
                $data['r'] = 'NOT_WALLET';
                $data['s'] = 1;
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_ITEMS';
        }
    } else {
        $UserSupport->addLog([
            'company_id' => $data['user_login_id'],
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 