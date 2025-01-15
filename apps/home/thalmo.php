<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'thalmo',"thalmo",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'Thalmo.vue.js',
	'thalmo.css'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'Translator' => $Translator
]);
$Layout();