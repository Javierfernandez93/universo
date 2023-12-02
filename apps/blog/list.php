<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::BLOG;

$Layout->init(JFStudio\Router::getName($route),'list',"simple",'',TO_ROOT.'/');

$Layout->setScript([
	'blog.css',
	'bloglist.vue.js'
]);

$Layout->setVar([
	'UserLogin' => new Site\UserLogin,
	'route' => $route
]);
$Layout();