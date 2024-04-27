<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$key_name = HCStudio\Util::getParam("key_name");

$Layout = JFStudio\Layout::getInstance();
$Layout->init("Aprendiendo en curso","learning","backoffice","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['courses.*','view-courses.css','courses-style.css']);

$UserLogin = new Site\UserLogin;
$SessionPerCourse = new OwnBoss\SessionPerCourse;
$Course = new OwnBoss\Course;

$SessionPerCourse->loadWhere("session_per_course_id = ?",HCStudio\Util::getParam("spcid"));
$Course->loadWhere("course_id = ?",$SessionPerCourse->getCourseId(HCStudio\Util::getParam("spcid")));

$Layout->setVar([
	"nav" => "courses",
	"static_sidebar" => true,
	"SessionPerCourse" => $SessionPerCourse,
	"Course" => $Course,
	"UserLogin" => $UserLogin,
]);
$Layout();