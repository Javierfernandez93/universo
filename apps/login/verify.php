<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true) {
    HCStudio\Util::redirectTo(TO_ROOT."/apps/backoffice/");
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Account;
$Layout->init(JFStudio\Router::getName($route),'verify',"two_columns",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
    'login.css',
    'verify.vue.js'
]);

$Layout->setVar([
	'UserLogin' => $UserLogin
]);
$Layout();