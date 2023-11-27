<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('backoffice_access') === true)
    {
        if(sendPayout([
            'withdraw_per_user_id' => $data['withdraw_per_user_id'],
            'amount' => $data['amount'],
            'address' => $data['wallet'],
            'user_login_id' => $data['user_login_id']
        ])) {
            if(Site\WithdrawPerUser::setAsProcessingForPayout($data['withdraw_per_user_id']))
            {
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_PROCESSING";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_CREATE_PAYOUT";
        }
    } else {
        $UserSupport->addLog([
            'withdraw_per_user_id' => $data['withdraw_per_user_id'],
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
    
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function sendPayout(array $data = null)
{
    require_once TO_ROOT .'/vendor/autoload.php';

    $Sdk = new \CapitalPayments\Sdk\Sdk(JFStudio\CapitalPayments::API_KEY,JFStudio\CapitalPayments::API_SECRET);

	$response = $Sdk->createPayout([
		'payout_id' => $data['withdraw_per_user_id'],
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