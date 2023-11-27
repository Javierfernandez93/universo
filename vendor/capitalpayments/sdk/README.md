# CapitalPayments
This Api has been made Crypto Payments based on USDT.TRC20
All examples are available into examples/ folder.

# Install with composer 
> composer require capitalpayments/sdk:dev-main

1. Create an account [Create account](capitalpayments.me/apps/signup "Create account")
2. Create api key [here](https://www.capitalpayments.co/apps/api/ "here")
3. Follow next steps to connect your account

(NOTE: Sandbox mode needs test coins request [here](https://www.capitalpayments.co/apps/api/ "here"))

# Login 

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

$response = $Sdk->login();

```

# Get environment 

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the environment : response >= int $sandobox (0 or 1)
$response = $Sdk->getEnvironment();

```

# Get account

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the account data
$response = $Sdk->getAccount();

```

# Get balance

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the balance from the api
$response = $Sdk->getBalance();

```

# Get main wallet

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get main wallet data (private key is included)
$response = $Sdk->getMainWallet();

```

# Get wallets

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrives all wallets attached to api 
$response = $Sdk->getWallets();

```
# Create invoice

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the invoice data
$response = $Sdk->createInvoice([
    'invoice_id' => 'invoice_id' # string 
    'amount' => 'amount' # float|int 
]);

```
# Create invoices

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the invoices data
$response = $Sdk->createInvoices([
    [
        'invoice_id' => 'invoice_id' # string 
        'amount' => 'amount' # float|int 
    ],
    [
        'invoice_id' => 'invoice_id' # string 
        'amount' => 'amount' # float|int 
    ]
]);

```
# Get invoice status

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the invoice status
$response = $Sdk->getInvoiceStatus([
    'invoice_id' => 'invoice_id' # string 
]);

```

# Cancel invoice

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the invoice status
$response = $Sdk->cancelInvoice([
    'invoice_id' => 'invoice_id' # string 
]);

```

# Create payout

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the payout data
$response = $Sdk->createPayout([
    'payout_id' => 'payout_id' # string 
    'amount' => 'amount' # float|int 
    'address' => 'USDT.TRC20WalletAddress' # string
]);

```

# Create payouts

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the payouts data
$response = $Sdk->createPayouts([
    [
        'payout_id' => 'payout_id' # string 
        'amount' => 'amount' # float|int 
        'address' => 'USDT.TRC20WalletAddress' # string
    ],
    [
        'payout_id' => 'payout_id' # string 
        'amount' => 'amount' # float|int 
        'address' => 'USDT.TRC20WalletAddress' # string
    ]
]);

```

# Get payout status

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# get the payout status
$response = $Sdk->getPayoutStatus([
    'payout_id' => 'payout_id' # string 
]);

```

# Cancel payout 

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# cancel payout  
$response = $Sdk->cancelPayout([
    'payout_id' => 'PayoutId', # @string
]);

```

# Create item

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the item data
$response = $Sdk->createItem([
    'title' => 'title' # string 
    'description' => 'description' # float|int 
    'price' => 'price' # string
]);

```
# Get item

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the item data
$response = $Sdk->getItem([
    'item_id' => 'item_id' # string 
]);

```
# Get items

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the items data
$response = $Sdk->getItems();

```
# Delete item

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# 
$response = $Sdk->deleteItem([
    'item_id' => 'item_id' # string 
]);


```

# Create customer

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the customer data
$response = $Sdk->createCustomer([
    'name' => 'name' # string 
    'email' => 'email' # float|int 
    'whatsapp' => 'whatsapp' # float|int 
    'address' => 'address' # string
]);

```
# Get customer

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# retrieve the customer data
$response = $Sdk->getCustomer([
    'customer_id' => 'customer_id' # string 
]);

```
# Get customers

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

#
$response = $Sdk->getCustomers();

```
# Delete customer

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# 
$response = $Sdk->deleteCustomer([
    'customer_id' => 'customer_id' # string 
]);


```
# Set test invoice as payed

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# set invoice as payed (it will takes 5 minutes to complete the payment invoice process)
$response = $Sdk->setTestInvoiceAsPayed([
    'invoice_id' => 'InvioceID-InvoiceNumber1', # @string
]);



```

# Set deposit wallet address

```
<?php 

include __DIR__ . "/../vendor/autoload.php";

$Sdk = new CapitalPayments\Sdk\Sdk('api_key','api_secret');

# set deposit wallet
$response = $Sdk->setDepositWallet([
    'address' => 'USDT.TRC20_WALLET_ADDRESS', # @string
]);


```