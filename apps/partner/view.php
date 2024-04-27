<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$key_name = HCStudio\Util::getParam("key_name");

$Layout = JFStudio\Layout::getInstance();
$Layout->init("Cursos","view","backoffice","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['courses.*','view-courses.css']);

$UserLogin = new Site\UserLogin;
$Course = new OwnBoss\Course;

$Course->loadWhere("course_id = ?",HCStudio\Util::getParam("cid"));

$Layout->setVar([
	"nav" => "courses",
	"static_sidebar" => true,
	"Course" => $Course,
	"UserLogin" => $UserLogin,
]);
$Layout();