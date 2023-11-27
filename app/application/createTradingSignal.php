<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('add_signals') === true)
    {
        if($data['message'])
        {
            if(createTradingSignal($data['message']) === true)
            {
                if(Site\TradingSignal::add([
                    'user_support_id' => $UserSupport->getId(),
                    'message' => $data['message']
                ]))
                {
                    $data['s'] = 1;
                    $data['r'] = 'DATA_OK';
                } else {
                    $data['s'] = 0;
                    $data['r'] = 'ERROR_CREATING_SIGNAL';
                }
            } else {
                $data['s'] = 0;
                $data['r'] = 'DUMMY_API_COMMUNICATION_ERROR';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_SIGNALS';
        }
    } else {
        $UserSupport->addLog([
            'message' => $data['message'],
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

function createTradingSignal(string $message = null) : bool
{
    require_once TO_ROOT .'/vendor/autoload.php';

    $Sdk = new \DummyTrader\Sdk\Sdk(JFStudio\DummyTrader::API_KEY,JFStudio\DummyTrader::API_SECRET);

    $response = $Sdk->login();

    if($response['status'] == 200)
    {
        $response = $Sdk->sendMessageToChannel([
            'telegram_api_id' => 4,
            'telegram_channel_id' => 3,
            'message' => $message,
        ]);

        return $response['s'] ?? false == 1 ? true : false;
    }

    return false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 