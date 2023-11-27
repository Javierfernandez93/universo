<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::WalletProcess;
$Layout->init(JFStudio\Router::getName($route),'process',"paymentGateway",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'paymentgateway.vue.js'
]);

$Layout->setVar([
	'route' => $route
]);
$Layout();