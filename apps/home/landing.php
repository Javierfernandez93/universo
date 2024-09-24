<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Home;

$Layout->init(JFStudio\Router::getName($route),'landing',"landing",'',TO_ROOT.'/');

$Translator = JFStudio\Translator::getInstance();
$Translator->init();

$Layout->setScript([
	'nayal.css'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'Translator' => $Translator
]);
$Layout();