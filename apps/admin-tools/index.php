<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_tools') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$route = JFStudio\Router::AdminTools;
$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),"index","admin","",TO_ROOT."/");


$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'admintools.vue.js'
]);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();