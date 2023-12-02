<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::RealState;

$Layout->init(JFStudio\Router::getName($route),'index',"simple",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'realstate.css',
	'realstate.vue.js'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'route' => $route
]);
$Layout();