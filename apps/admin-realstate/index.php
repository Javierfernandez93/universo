<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->_loaded === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_properties') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AdminRealState;
$Layout->init(JFStudio\Router::getName($route),"index","admin","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['adminrealstate.vue.js']);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();