<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'kelaya',"kelaya",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'Kelaya.vue.js',
	'kelaya.css'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'Translator' => $Translator
]);
$Layout();