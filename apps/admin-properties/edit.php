<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->_loaded === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_cron') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AdminPropertiesEdit;
$Layout->init(JFStudio\Router::getName($route),"edit","admin","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['editproperty.vue.js']);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();