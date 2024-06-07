<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if(!$UserLogin->logged && !$UserSupport->logged)
{
    error(JFStudio\Constants::RESPONSES['INVALID_CREDENTIALS']);
}

$catalog_payment_methods = (new Site\CatalogPaymentMethod)->getAll();

if(empty($catalog_payment_methods))
{
    error(JFStudio\Constants::RESPONSES['NOT_DATA']);
}

success(JFStudio\Constants::RESPONSES['DATA_OK'],[
    'catalog_payment_methods' => $catalog_payment_methods
]);