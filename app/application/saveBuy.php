<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $Cart = Jcart\Cart::getInstance(Jcart\Cart::LAST_INSTANCE);
	$Cart->loadFromSession();

	if($Cart->count() > 0)
	{
		if($Cart->getVar('catalog_payment_method_id'))
		{
			if($BuyPerUser = saveBuy($Cart,$UserLogin))
			{	
				$data['buy_per_user_id'] = $BuyPerUser->getId();
				$data['user_login_id'] = $UserLogin->getId();
				$data['invoice_id'] = $BuyPerUser->invoice_id;

				$Cart->delete();

				if($checkout_data = createTransaction($BuyPerUser,$UserLogin))
				{
					$BuyPerUser->checkout_data = json_encode($checkout_data);
					
					if($BuyPerUser->save())
					{
						$data['s'] = 1;
						$data['r'] = 'SAVE_OK';
					} else {
						$data['s'] = 0;
						$data['r'] = 'NOT_UPDATE';
					}
				} else { 
					$data['s'] = 0;
					$data['r'] = 'NOT_CHECKOUT_DATA';
				} 
			} else {
				$data['s'] = 0;
				$data['r'] = 'NOT_SAVE';
			} 
		} else {
			$data['s'] = 0;
			$data['r'] = 'NOT_CATALOG_PAYMENT_METHOD_ID';
		}		
	} else {
		$data['s'] = 0;
		$data['r'] = 'NOT_ITEMS';
	}
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

function createTransaction(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
	if($BuyPerUser->catalog_payment_method_id == Site\CatalogPaymentMethod::COINPAYMENTS)
	{
		return createTransactionFromCoinPayments($BuyPerUser,$UserLogin);
	} else if($BuyPerUser->catalog_payment_method_id == Site\CatalogPaymentMethod::EWALLET) {
		return createTransactionFromEwallet($BuyPerUser,$UserLogin);
	} else if($BuyPerUser->catalog_payment_method_id == Site\CatalogPaymentMethod::PAYPAL) {
		return createTransactionPayPal($BuyPerUser,$UserLogin);
	} else if($BuyPerUser->catalog_payment_method_id == Site\CatalogPaymentMethod::AIRTM) {
		return createTransactionAirtm($BuyPerUser,$UserLogin);
	} else if($BuyPerUser->catalog_payment_method_id == Site\CatalogPaymentMethod::CAPITALPAYMENTS) {
		return createTransactionCapitalPayments($BuyPerUser,$UserLogin);
	}
}

function createTransactionCapitalPayments(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
    require_once TO_ROOT .'/vendor/autoload.php';

	$Sdk = new \CapitalPayments\Sdk\Sdk(Site\SystemVar::_getValue("api_key"),Site\SystemVar::_getValue("api_secret"));

	$response = $Sdk->createInvoice([
		'amount' => $BuyPerUser->amount,
		'invoice_id' => $BuyPerUser->invoice_id,
		'unique_id' => $BuyPerUser->user_login_id,
		'whatsapp' => (new Site\UserContact)->getWhatsApp($BuyPerUser->user_login_id),
		'name' => (new Site\UserData)->getName($BuyPerUser->user_login_id),
		'email' => (new Site\UserLogin)->getEmail($BuyPerUser->user_login_id)
	]);

	if(isset($response['status']))
	{
		if ($response['status'] == JFStudio\CapitalPayments::STATUS_200) {
			return $response['invoice'];
		} 
	}


	return false;
}

function createTransactionAirtm(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
	return [
		'amount' => $BuyPerUser->amount,
		'txn_id' => $BuyPerUser->invoice_id,
		'email' => JFStudio\Airtm::CUSTOMER_EMAIL,
		'unix_time' => time(),
		// 'checkout_url' => "http://localhost:8888/Site/apps/airtm/process".$UserLogin->getPidQuery()."&txn_id={$BuyPerUser->invoice_id}"
		'checkout_url' => "https://www.universodejade.com/apps/airtm/process".$UserLogin->getPidQuery()."&txn_id={$BuyPerUser->invoice_id}"
	];
}

function createTransactionFromEwallet(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
	return [
		'amount' => $BuyPerUser->amount,
		'txn_id' => $BuyPerUser->invoice_id,
		'unix_time' => time(),
		'checkout_url' => "../../apps/ewallet/process?txn_id={$BuyPerUser->invoice_id}"
	];
}

function createTransactionFromCoinPayments(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
	try {
		require_once TO_ROOT .'/vendor2/autoload.php';


		$CoinpaymentsAPI = new CoinpaymentsAPI(JFStudio\CoinPayments::PRIVATE_KEY, JFStudio\CoinPayments::PUBLIC_KEY, 'json');

		$req = [
			'amount' => ceil($BuyPerUser->amount),
			'currency1' => 'USD',
			'currency2' => $BuyPerUser->getCurrency(),
			'buyer_name' => $UserLogin->getNames(),
			'buyer_email' => $UserLogin->email,
			'item_name' => "Pago de orden {$BuyPerUser->invoice_id}",
			'custom' => $BuyPerUser->invoice_id,
			'item_number' => $BuyPerUser->invoice_id,
			'address' => '', // leave blank send to follow your settings on the Coin Settings page
			'ipn_url' => 'https://www.universodejade.com/app/cronjob/ipn_coinpayments.php',
		];
						
		$result = $CoinpaymentsAPI->CreateCustomTransaction($req);

		if ($result['error'] == 'ok') {
	
			return $result['result'];
		} else {
			print 'Error: '.$result['error']."\n";
		}
	} catch (Exception $e) {
		echo 'Error: ' . $e->getMessage();
		exit();
	}	
}

function createTransactionPayPal(Site\BuyPerUser $BuyPerUser = null,Site\UserLogin $UserLogin = null)
{
	require_once TO_ROOT . "/system/vendor/autoload.php";

	$apiContext = new \PayPal\Rest\ApiContext(
	    new \PayPal\Auth\OAuthTokenCredential(
	        JFStudio\PayPal::CLIENT_ID,
	        JFStudio\PayPal::CLIENT_SECRET
	    )
	);

	$apiContext->setConfig(['mode' => JFStudio\PayPal::MODE]);

	$payer = new \PayPal\Api\Payer;
	
    $payer->setPaymentMethod('paypal');

    $total = $BuyPerUser->amount+$BuyPerUser->fee; 
	
    $amount = new \PayPal\Api\Amount;
	$amount->setTotal((string)$total);
	$amount->setCurrency('USD');
	$amount->setDetails($details);

	$transaction = new \PayPal\Api\Transaction;
	$transaction->setAmount($amount);
    $transaction->setInvoiceNumber($BuyPerUser->getId());
    
	$redirectUrls = new \PayPal\Api\RedirectUrls;
	$redirectUrls->setReturnUrl(JFStudio\PayPal::RETURN_URL)
	    ->setCancelUrl(JFStudio\PayPal::CANCEL_URL);

	$payment = new \PayPal\Api\Payment;
	$payment->setIntent('sale')
	    ->setPayer($payer)
	    ->setTransactions(array($transaction))
	    ->setRedirectUrls($redirectUrls);

	try {
	    $payment->create($apiContext);

		return [
			'checkout_url' => $payment->getApprovalLink(),
			'txn_id' => $payment->getId(),
			'fee' => $BuyPerUser->fee,
			'unix_time' => time(),
			'amount' => $BuyPerUser->amount,
			'total' => $total
		];
	} catch (\PayPal\Exception\PayPalConnectionException $ex) {
	    echo $ex->getData();
	}
}

function saveBuy($Cart = null,$UserLogin = null)
{
	$BuyPerUser = new Site\BuyPerUser;
	$BuyPerUser->user_login_id = $UserLogin->company_id;
	$BuyPerUser->fee = $Cart->getVar('fee');
	$BuyPerUser->item = $Cart->getFormatedItems();
	$BuyPerUser->checkout_data = json_encode([]);
	$BuyPerUser->ipn_data = json_encode([]);
	$BuyPerUser->invoice_id = $Cart->_instance_id;
	$BuyPerUser->shipping = 0;
	$BuyPerUser->catalog_payment_method_id = $Cart->getVar('catalog_payment_method_id');
	$BuyPerUser->catalog_currency_id = $Cart->getVar('catalog_currency_id') ? $Cart->getVar('catalog_currency_id') : Site\CatalogCurrency::USD;
	$BuyPerUser->amount = $Cart->getTotalAmount(null,null,['fee'=>false]);
	$BuyPerUser->create_date = time();

	return $BuyPerUser->save() ? $BuyPerUser : false;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 