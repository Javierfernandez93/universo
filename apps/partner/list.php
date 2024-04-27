<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$key_name = HCStudio\Util::getParam("key_name");

$Layout = JFStudio\Layout::getInstance();
$Layout->init("Cursos","list","backoffice","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['courses.*']);

$UserLogin = new Site\UserLogin;

$Layout->setVar([
	"nav" => "courses",
	"UserLogin" => $UserLogin,
]);
$Layout();