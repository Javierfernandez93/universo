<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('list_mam'))
    {
        $BuyPerBridge = new Site\BuyPerBridge;

        if($BuyPerBridge->isAviableToSendMoneyToBridge($data['buy_per_bridge_id']))
        {
            if(Site\BuyPerBridge::setAsProcessing($data['buy_per_bridge_id']))
            {
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_PROCESSING";
            }	
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_AVIABLE_TO_SEND_MONEY";
        }	
    } else {
        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

function sendPayout(array $data = null)
{
    require_once TO_ROOT .'/vendor/autoload.php';

    $Sdk = new \CapitalPayments\Sdk\Sdk(JFStudio\CapitalPayments::API_KEY,JFStudio\CapitalPayments::API_SECRET);

	$response = $Sdk->createPayout([
		'payout_id' => $data['payout_id'],
		'amount' => $data['amount'],
		'address' => $data['address'],
		'whatsapp' => (new Site\UserContact)->getWhatsApp($data['user_login_id']),
		'name' => (new Site\UserData)->getName($data['user_login_id']),
		'email' => (new Site\UserLogin)->getEmail($data['user_login_id'])
	]);

	if ($response['status'] ?? false == JFStudio\CapitalPayments::STATUS_200) {
		return $response['payout'];
	} 

	return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 