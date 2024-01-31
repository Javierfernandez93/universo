<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

$route = JFStudio\Router::AdminClientAdd;
$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),"add","backoffice","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'jquery.mask.js',
	'addclientseller.vue.js'
]);

$Layout->setVar([
	'route' => $route,
	'UserLogin' => $UserLogin
]);
$Layout();