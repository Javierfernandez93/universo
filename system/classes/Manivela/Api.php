<?php

namespace Manivela;

use Site\SystemVar;

use \Curl\Curl;
use \Exception;

class Api extends Curl {
	protected static $instance;

    public $token = null;

    const API_URL = "https://crmarka.com/api/";
    const API_MONDAY_URL = "https://crmarka.com/api_monday/";

	public static function getInstance()
    {
       if(self::$instance instanceof self === false) {
         self::$instance = new self;
       }

       return self::$instance;
    }

    /**
     * Retrieves the login parameters for the Manivela API.
     *
     * @return array An associative array containing the email and password for the Manivela API login.
     */
    public function getLoginParams() {
        return [
            'email' => SystemVar::_getValue('manivela:email'),
            'password' => SystemVar::_getValue('manivela:password')
        ];
    }

    public function getApiUrl(string $endPoint = null) {
        return self::API_URL.$endPoint;
    }

    public function getApiUrlMonday(string $endPoint = null) {
        return self::API_MONDAY_URL.$endPoint;
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
    
        $this->post($this->getApiUrl('authentication/'),$this->getLoginParams());

        $respose = $this->_getResponse();

        if($respose['success'] == 1)
        {
            return $respose['token'];
        }

        return false;
    }

    public function getSales()
    {
        $this->_preparePayload();
        $this->post($this->getApiUrl('ventas/')); 

        return $this->_getResponse();
    }

    // post functions
    public function requiredGeneral(array $data = []) {
        if(!isset($data['event']))
        {
            throw new Exception('Event is not allowed');
        }
        
        $this->post($this->getApiUrlMonday('required_general.php'),json_encode($data));

        $respose = $this->_getResponse();

        return $respose;
    }

    public function test(array $data = null) { 
        
        $this->post('http://localhost:8888/universo/app/test/getData',$data);  
        
        d($this->response);

        return $this->_getResponse();
    }

    // post functions
    public function requiredApart(array $data = null) {
        if(!isset($data['event']))
        {
            throw new Exception('Event is not allowed');
        }

        $this->_preparePayload();
        $this->post($this->getApiUrlMonday('required_apart.php'),json_encode($data));

        return $this->_getResponse();
    }

    /* gets */
    public function _getResponse(): array|bool
    {
        return json_decode($this->getResponse(),true);
    }

    public function _preparePayload()
    {
        $this->generateTokenAccess();
        $this->setHeader('Authorization', 'Bearer '.$this->token);
        $this->setHeader('Content-Type', 'application/json');
    }
}