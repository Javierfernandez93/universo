<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\CapitalPayments;

class HookManager extends Orm {
    public $tblName = 'hook_manager';
	private static $instance;

    public static function getInstance()
 	{
	    if(self::$instance instanceof self === false) {
	      self::$instance = new self;
	    }

	    return self::$instance;
 	}

    public static function add(array $data = null) : bool
    {
        $HookManager = new HookManager;
        $HookManager->user_api_id = $data['user_api_id'];
        $HookManager->data = json_encode($data);
        $HookManager->create_date = time();

        return $HookManager->save();
    }

    public static function sendHook(array $data = null)
    {
        if(isset($data['hook_url'])) {

            require TO_ROOT . '/vendor/autoload.php';

            $Curl = new \Curl\Curl;

            $Curl->setBasicAuthentication($data['api_key'],$data['ipn_secret']);
            // $Curl->setHeader("Content-Type","application/json");
            $Curl->post($data['hook_url'],$data);

            if($Curl->getHttpStatusCode() == CapitalPayments::STATUS_200)
            {
                $response = $Curl->getResponse();
            
                return $response ?? true;
            }

            return false;
        }

        return false;
    }
}