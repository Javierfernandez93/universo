<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}
    
$data = HCStudio\Util::getHeadersForWebService();

$filter = '';

if(isset($data['catalog_payment_type_id']))
{
    $filter = "AND catalog_payment_type.catalog_payment_type_id = '{$data['catalog_payment_type_id']}'";
}

if(isset($data['query']) && !empty($data['query']))
{
    $filter = "AND (user_data.names LIKE '%{$data['query']}%' OR property.title LIKE '%{$data['query']}%' OR user_login.email LIKE '%{$data['query']}%' OR real_state.title LIKE '%{$data['query']}%')";
}

$payments = $UserSupport->getPayments($filter);

if(!$payments)
{
    error(Constants::RESPONSES['NOT_DATA']);
}

success(null,[
    'payments' => $payments
]);