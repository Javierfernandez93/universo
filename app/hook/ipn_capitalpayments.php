<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";


$api_key = Site\SystemVar::_getValue("api_key");
$ipn_secret = Site\SystemVar::_getValue("ipn_secret");

if (!isset($_SERVER['PHP_AUTH_USER']) || empty($_SERVER['PHP_AUTH_USER'])) {
    echo json_encode(['error'=>"No api_key authentication sent"]);die;
}

if (!isset($_SERVER['PHP_AUTH_PW']) || empty($_SERVER['PHP_AUTH_PW'])) {
    echo json_encode(['error'=>"No ipn_secret authentication sent"]);die;
}

$data = ["acces" => 1];

$request = file_get_contents('php://input');

if ($request === FALSE || empty($request)) {
  die("Error reading POST data");
}

parse_str($request, $output);

processIPN($output);

function processIPN(array $data = null)
{    
    if($data['status'] == JFStudio\CapitalPayments::ORDER_PAID)
    {
        validateBuy($data);
    } else if($data['status'] == JFStudio\CapitalPayments::ORDER_CANCELED) {
        deleteBuy($data);
    } else if($data['status'] == JFStudio\CapitalPayments::PAYOUT_DONE) {
        setPayoutAsDone($data);
    }

    saveIPN($data);
}

function saveIPN(array $data = null)
{
  $Ipn = new Site\Ipn;
  $Ipn->data = json_encode($data);
  $Ipn->create_date = time();
  $Ipn->status = 1;
  $Ipn->save();
}

function validateBuy(array $data = null)
{
    $url = HCStudio\Connection::getMainPath()."/app/application/validateBuy.php";
    
    $Curl = new JFStudio\Curl;
    $Curl->post($url, [
        'user' => HCStudio\Util::USERNAME,
        'password' => HCStudio\Util::PASSWORD,
        'invoice_id' => $data['invoice_id'],
        'catalog_validation_method_id' => Site\CatalogValidationMethod::CAPITALPAYMENTS_IPN,
        'ipn_data' => json_encode($data),
    ]);
    
    return $Curl->getResponse(true);
}

function deleteBuy(array $data = null)
{
    $url = HCStudio\Connection::getMainPath()."/app/application/deleteBuy.php";

    $Curl = new JFStudio\Curl;
    $Curl->post($url, [
        'user' => HCStudio\Util::USERNAME,
        'password' => HCStudio\Util::PASSWORD,
        'invoice_id' => $data['order_id'],
        'status' => Site\BuyPerUser::EXPIRED,
        'catalog_validation_method_id' => Site\CatalogValidationMethod::CAPITALPAYMENTS_IPN,
        'ipn_data' => json_encode($data),
    ]);

    return $Curl->getResponse(true);
}

function setPayoutAsDone(array $data = null)
{
    if(Site\BuyPerBridge::isBuyPerBridgePayoutId($data['payout_id']))
    {   
        Site\BuyPerBridge::setAsBridgePaid([
            'buy_per_bridge_id' => Site\BuyPerBridge::getSanitizedId($data['payout_id']),
            'tx_id' => $data['tx_id'],
        ]);
    } else {
        Site\WithdrawPerUser::setAsDepositedForPayout([
            'withdraw_per_user_id' => $data['payout_id'],
            'tx_id' => $data['tx_id']
        ]);
    }
}

echo json_encode($data);