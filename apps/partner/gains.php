<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

$Layout = JFStudio\Layout::getInstance();

$Layout->init("Ganancias","gains","backoffice","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['partner-gains.*']);

$UserLogin = new Site\UserLogin;

$Layout->setVar([
	"nav" => "partner",
	"Proyect" => new OwnBoss\Proyect,
	"UserLogin" => $UserLogin,
]);
$Layout();