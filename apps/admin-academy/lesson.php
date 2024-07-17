<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

$route = JFStudio\Router::AcademyLesson;

$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),'lesson',"admin",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'lesson.css',
	'LessonLeader.vue.js'
]);

$Layout->setVar([
	'route' =>  $route,
	'UserSupport' => $UserSupport
]);
$Layout();