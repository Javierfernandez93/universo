<?php

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrives all customers array
$response = $Sdk->getCustomers();
