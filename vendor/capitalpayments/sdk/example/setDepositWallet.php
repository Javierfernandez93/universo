<?php

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# set deposit wallet
$response = $Sdk->setDepositWallet([
    'address' => 'USDT.TRC20_WALLET_ADDRESS', # @string
]);
