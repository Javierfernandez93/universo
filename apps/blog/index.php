<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

if(!$_GET['bid'])
{
	HCStudio\Util::redirectTo(TO_ROOT."/apps/blog/list");
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::BLOG;

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