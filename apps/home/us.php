<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Us;
$Layout->init(JFStudio\Router::getName($route),'us',"us",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'us.css',
	'us.vue.js'
]);

$Layout->setVar([
	'route' => $route
]);
$Layout();