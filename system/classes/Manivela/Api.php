<?php

namespace Manivela;

use JFStudio\Curl;

class Api extends Curl {
	private static $instance;

    public $token = null;
    public $curl = null;

    const EMAIL = 'carla.barrera@universodejade.com';
    const PASSWORD = 'C4rlaBarrera1@';
    const API_URL = "https://crmarka.com/api/";

	public static function getInstance()
    {
       if(self::$instance instanceof self === false) {
         self::$instance = new self;
       }

       return self::$instance;
    }

    public function __construct() {
        $this->curl = new Curl;
    }

    public function getLoginParams() {
        return [
            'email' => self::EMAIL,
            'password' => self::PASSWORD
        ];
    }

    public function getApiUrl(string $endPoint = null) {
        return self::API_URL.$endPoint;
    }

    public function getTokenAccess() {
        return [
            'jwt' => $this->token
        ];
    }

    public function generateTokenAccess() {
        if(!$this->token)
        {
            $this->token = $this->login();
        }

        return $this->token;
    }
    
    public function login() {
        try {
            $result = $this->curl->post($this->getApiUrl('authentication/'),$this->getLoginParams());

            $response = $result->getResponse(true);

            if($response['success'] == 1)
            {
                return $response['token'];
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    public function getSales() {
        $this->generateTokenAccess();

        try {
            $this->curl->setHeader('Authorization', 'Bearer '.$this->token);
            $result = $this->curl->post($this->getApiUrl('ventas/'));

            $response = $result->getResponse(true);

            return $response;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}