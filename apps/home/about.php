<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::About;
$Layout->init(JFStudio\Router::getName($route),'about',"about",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'about.css',
	'about.vue.js'
]);

$Layout->setVar([
	'route' => $route
]);
$Layout();