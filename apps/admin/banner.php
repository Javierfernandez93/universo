<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_banners') === false) {
	HCStudio\Util::redirectTo('../../apps/admin-users/');
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AdminBanner;
$Layout->init(JFStudio\Router::getName($route),"banner","admin","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'chart.js',
	'adminbanner.vue.js',
]);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();