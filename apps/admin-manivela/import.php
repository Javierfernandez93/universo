<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->_loaded === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_manivela') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

// (new Site\RealState)->truncate();

// (new Site\UserLogin)->truncate();
// (new Site\Property)->truncate();
// (new Site\PaymentProperty)->truncate();
// (new Site\UserReferral)->truncate();
// (new Site\UserData)->truncate();
// (new Site\UserContact)->truncate();
// (new Site\UserAddress)->truncate();
// (new Site\UserAccount)->truncate();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AdminManivela;
$Layout->init(JFStudio\Router::getName($route),"import","admin","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['manivela.vue.js']);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();