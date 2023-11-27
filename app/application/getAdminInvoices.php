<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('list_buys') === true)
    {
        if($invoices = (new Site\PaymentGateway)->getAdminInvoices($data['status']))
        {
            $data['invoices'] = $invoices;
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_INVOICES';
        }	
    } else {
        $UserSupport->addLog([
            'transaction' => json_encode(['address'=>$data['address'],'amount'=>$data['amount']]),
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

function format(array $invoices = null) : array 
{    
    return array_map(function($invoice) {
        $invoice = Site\BuyPerUser::_unformatData($invoice);

        return $invoice;
    },$invoices);
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 