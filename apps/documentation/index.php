<?php

use HCStudio\Util;

 define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === false) {
	HCStudio\Util::redirectTo('../../apps/login/');
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Documentation;
$Layout->init(JFStudio\Router::getName($route),"index","documentation","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'interact.min.js',
	'beautify-html.js',
	'material.css',
	'codemirror.*',
	'active-line.js',
	'closetag.js',
	'autorefresh.js',
	'css.js',
	'xml-fold.js',
	'closebrackets.js',
	'javascript.js',
	'xml.js',
	'htmlmixed.js',
	'documentation.vue.js',
]);

$Layout->setVar([
	"documentation_id" => Util::getVarFromPGS('did') ? Util::getVarFromPGS('did') : 1,
	"UserLogin" => $UserLogin,
	"documentations" => (new Site\Documentation)->getAllTitles(),
	"route" => $route,
]);
$Layout();