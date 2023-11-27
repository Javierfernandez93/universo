<?php

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# set invoice as payed (it will takes 5 minutes to complete the payment invoice process)
$response = $Sdk->setTestInvoiceAsPayed([
    'invoice_id' => 'InvioceID-InvoiceNumber1', # @string
]);
