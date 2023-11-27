<?php

namespace Site;

use HCStudio\Util;
use JFStudio\Curl;

class ApiSite {
    // const END_POINT = 'http://54.162.5.4:3000/';
    const END_POINT = 'http://localhost:3000/';
    const END_POINT_EXMA = 'http://44.201.64.220:3000/';
    const ROUTES = [
        'GET_USER' => "user/get",
        'SIGNUP' => "user/sign",
    ];

	public function __construct() {
	}

	public static function hasCredentials(array $data = null) : bool
    {
        return isset($data['email'],$data['password']);
    }

	public static function getUrlGetUser()
    {
        return self::END_POINT.self::ROUTES['GET_USER'];
    }
	
    public static function getUrlSignupUser()
    {
        return self::END_POINT.self::ROUTES['SIGNUP'];
    }
	
    public static function getUrlSignupUserExma()
    {
        return self::END_POINT_EXMA.self::ROUTES['SIGNUP'];
    }

	public static function getUser(array $data = null)
	{
        if(isset($data) === true)
        {
            if(self::hasCredentials($data))
            {
                $Curl = new Curl;            

                $Curl->get(self::getUrlGetUser(), $data);

                $response = $Curl->getResponse(true);
                
                return $response??['s'] == 1 ? true : $response;
            }

            return false;
        }
        
        return false;
	}
	
    public static function signupUser(array $data = null)
	{
        if(isset($data) === true)
        {
            $Curl = new Curl;            

            $data['firstname'] = Util::sanitizeString($data['firstname']);
            $data['lastname'] = Util::sanitizeString($data['lastname']);
            $data['address'] = Util::sanitizeString($data['address']);

            $Curl->get(self::getUrlSignupUser(), $data);

            return $Curl->getResponse(true);
        }
        
        return false;
	}
    
    public static function signupUserExma(array $data = null)
	{
        if(isset($data) === true)
        {
            $Curl = new Curl;            

            $data['firstname'] = Util::sanitizeString($data['firstname']);
            $data['lastname'] = Util::sanitizeString($data['lastname']);
            $data['address'] = Util::sanitizeString($data['address']);

            $Curl->get(self::getUrlSignupUserExma(), $data);

            return $Curl->getResponse(true);
        }
        
        return false;
	}
}
