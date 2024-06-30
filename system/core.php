<?php

function autoloadCore($className) {
	$className = ltrim($className, '\\');
	$fileName  = __DIR__ . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR;

	if ($lastNsPos = strrpos($className, '\\'))
	{
		$namespace = substr($className, 0, $lastNsPos);
		$className = substr($className, $lastNsPos + 1);
		$fileName  .= str_replace('\\', DIRECTORY_SEPARATOR, $namespace) . DIRECTORY_SEPARATOR;
	}
	$fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className) . '.php';

	if(stream_resolve_include_path($fileName)) require_once($fileName);
}


# Registramos autoload
spl_autoload_register('autoloadCore');

# Registramos timezone
// if (!date_default_timezone_get('date.timezone')) {
date_default_timezone_set('America/Mexico_City');
// setlocale(LC_ALL, "es_ES", 'Spanish_Spain', 'Spanish');
// }

# Aplicacion en producccion?
define('__DEBUG__', false);
define('LANGUAGE', 'spanish');

#
if(!__DEBUG__) {
	ini_set('error_reporting', E_ALL ^ E_NOTICE);
	ini_set('display_errors', '1');
} else  ini_set('display_errors', '0');

require_once Constants::ROOT."/vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(Constants::ROOT);
$dotenv->load();

/* main_function */
function debug($var = null,$clean_ob = true) : void
{
	if(isset($var) === true)
	{
		if($clean_ob === true)
		{
			ob_clean();
		}

		echo "<pre>";print_r($var);die;
	}
}

function d($var = null,$clean_ob = null) : void
{
	debug($var,$clean_ob);
}


function unauthorized(string $response = null,array $additional_data = null) : void
{
	webServiceResponse([
		's' => 0,
		'r' => $response ?? Constants::RESPONSES['INVALID_PERMISSION']
	],$additional_data);

	http_response_code(401);

	die;
}

function badRequest(string $response = null,array $additional_data = null) : void
{
	webServiceResponse([
		's' => 0,
		'r' => $response ?? Constants::RESPONSES['BAD_REQUEST']
	],$additional_data);

	http_response_code(400);

	die;
}

function error(string $response = null,array $additional_data = null,bool $logg = false) : void
{
	webServiceResponse([
		's' => 0,
		'r' => $response ?? Constants::RESPONSES['WEB_SERVICE_ERROR']
	],$additional_data);

	if($logg === true)
	{
		$UserSupport = new Site\UserSupport;

		Site\Logger::add([
			'method' => 'web_request',
			'field' => '',
			'type' => 'error',
			'action' => $response,
			'value' => json_encode($additional_data ?? null),
			'user_support_id' => $UserSupport->logged ? $UserSupport->getId() : 0,
			'create_date' => time(),
		]);		
	}

	http_response_code(200);

	die;
}

function success(string $response = null,array $additional_data = null) : void
{
	webServiceResponse([
		's' => 1,
		'r' => $response ?? Constants::RESPONSES['DATA_OK']
	],$additional_data);

	http_response_code(200);

	die;
}

function webServiceResponse(array $data = null,array $additional_data = null)
{
	if(isset($additional_data) === true)
	{
		$data = array_merge($data,$additional_data);
	}

	echo json_encode(HCStudio\Util::compressDataForPhone($data)); 
}
