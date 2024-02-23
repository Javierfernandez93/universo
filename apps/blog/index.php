<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

if($UserSupport->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_blog') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$route = JFStudio\Router::BLOG;
$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),'index',"blog",'',TO_ROOT.'/');

$Layout->setScript([
	'blog.css',
	'blog.vue.js'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'route' => $route
]);
$Layout();