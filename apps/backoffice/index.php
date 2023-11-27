<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

// (new Site\UserReferral)->truncate();

// $UserLogin->insertReferralOnSide([
// 	'user_login_id' => 2,
// 	'side' => Site\UserReferral::LEFT
// ]);
// // $UserLogin->insertReferralOnSide([
// // 	'user_login_id' => 3,
// // 	'side' => Site\UserReferral::RIGHT
// // ]);

// for($i = 4; $i < 52; $i++) 
// {
// 	$UserLogin->insertReferralOnSide([
// 		'user_login_id' => $i,
// 		'side' => Site\UserReferral::LEFT
// 	]);
// }

// die;
// d($UserLogin->getBinaryTree());

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Backoffice;
$Layout->init(JFStudio\Router::getName($route),'index',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'chart.js',
	'telegram.css',
	'banner.css',
	'backoffice.css',
	'backoffice.vue.js',
]);

$Layout->setVar([
	'route' =>  $route,
	'setApp' =>  true,
	'UserLogin' => $UserLogin
]);
$Layout();