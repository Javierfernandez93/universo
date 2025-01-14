<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'pandorah',"pandorah",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'Pandorah.vue.js',
	'pandorah.css'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'Translator' => $Translator
]);
$Layout();