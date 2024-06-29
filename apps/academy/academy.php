<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

if(!$UserLogin->hasAcademy()) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/backoffice/");
}

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Academy;
$Layout->init(JFStudio\Router::getName($route),'academy',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'academy.css',
	'academy.vue.js'
]);

$Layout->setVar([
	'route' =>  $route,
	'UserLogin' => $UserLogin
]);
$Layout();