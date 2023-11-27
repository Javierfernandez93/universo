<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['invoice_id']) 
    {
        if($UserSupport->hasPermission('delete_payment') === true) 
        {
            $url = HCStudio\Connection::getMainPath()."/app/application/deleteBuy.php";

            $Curl = new JFStudio\Curl;

            $Curl->post($url, [
                'user' => HCStudio\Util::USERNAME,
                'password' => HCStudio\Util::PASSWORD,
                'invoice_id' => $data['invoice_id'],
                'status' => Site\BuyPerUser::DELETED,
                'user_support_id' => $UserSupport->getId(),
            ]);

            // d($url."?".http_build_query([
            //     'user' => HCStudio\Util::USERNAME,
            //     'password' => HCStudio\Util::PASSWORD,
            //     'invoice_id' => $data['invoice_id'],
            //     'status' => Site\BuyPerUser::DELETED,
            //     'user_support_id' => $UserSupport->getId(),
            // ]));

            if($response = $Curl->getResponse(true))
            {
                $data['response'] = $response;
                $data['s'] = 1;
                $data['r'] = 'DATA_OK';
            } else {
                $data['s'] = 0;
                $data['r'] = 'NOT_RESPONSE';
            }
        } else {
            $UserSupport->addLog([
                'invoice_id' => $data['invoice_id'],
                'unix_date' => time(),
            ],Site\LogType::INVALID_VALIDATION_PERMISSION);

            $data['s'] = 0;
            $data['r'] = 'INVALID_PERMISSION';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_INVOICE_ID';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 