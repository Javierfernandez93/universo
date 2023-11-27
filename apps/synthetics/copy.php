<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;


if($UserLogin->logged === false) {
	Site\UserLogin::redirectTo(JFStudio\Router::getName($route));
}

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::CopySynthetics;
$Layout->init(JFStudio\Router::getName($route),'copy',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'copysynthetics.css',
	'copysynthetics.vue.js'
]);

$Layout->setVar([
	'route' =>  $route,
	'UserLogin' => $UserLogin
]);
$Layout();