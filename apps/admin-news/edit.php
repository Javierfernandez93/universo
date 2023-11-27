<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('edit_notice') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$route = JFStudio\Router::AdminNoticesEdit;
$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),"edit","admin","",TO_ROOT."/");


$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'quill.js',
	'quill.snow.css',
	'adminNoticeEdit.vue.js'
]);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();