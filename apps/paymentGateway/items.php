<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::WalletProcess;
$Layout->init(JFStudio\Router::getName($route),'items',"paymentGateway",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'paymentgatewaySDK.vue.js'
]);

$Layout->setVar([
	'merchant_id' => HCStudio\Util::getParam('merchant_id'),
	'api_key' => HCStudio\Util::getParam('api_key'),
	'route' => $route
]);
$Layout();