<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true) {
    HCStudio\Util::redirectTo(TO_ROOT."/apps/backoffice/");
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::RecoverPassword;
$Layout->init(JFStudio\Router::getName($route),'forgotPassword',"two_columns",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
    'login.css',
    'forgotpassword.vue.js'
]);

$Layout->setVar([
]);
$Layout();