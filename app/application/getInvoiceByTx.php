<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(true)
{
    if($data['invoice_tx'] ?? false)
	{
		if($invoice = (new Site\PaymentGateway)->getPaymentByTx($data['invoice_tx']))
		{
			$data['invoice'] = $invoice;
			$data['s'] = 1;
			$data['r'] = 'DATA_OK';
		} else {
			$data['s'] = 0;
			$data['r'] = 'NOT_INVOICE';
		}
	} else {
		$data['s'] = 0;
		$data['r'] = 'NOT_INVOICE_TX';
	}
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 