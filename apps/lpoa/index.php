<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";


$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Pel;
$Layout->init(JFStudio\Router::getName($route),'index',"pel",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'signaturePad.js',
	'pel.css',
	'autofxwinning.vue.js',
]);

$Layout->setVar([
	'route' =>  $route,
]);
$Layout();