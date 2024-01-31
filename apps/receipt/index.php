<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Receipt;
$Layout->init(JFStudio\Router::getName($route),'index',"receipt",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'signaturePad.js',
	'receipt.css',
	'receipt.vue.js',
]);

$Layout->setVar([
	'route' =>  $route,
]);
$Layout();