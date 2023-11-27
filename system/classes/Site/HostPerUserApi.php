<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;
use JFStudio\Curl;

class HostPerUserApi extends Orm {
  protected $tblName  = 'host_per_user_api';

  const HOST_PERMITTED = ['localhost','www.capitalpayments.me','www.funnel.capitalpayments.me','www.deltapayments.co'];
  public function __construct() {
    parent::__construct();
  }

  public static function validateHost(string $host = null) : bool
  {
    $response = (new Curl)->get($host);

    return $response->http_status_code == 200;
  }

  public static function updateHost(int $host_per_user_api_id = null,string $host = null) : bool
  {
    if(isset($host_per_user_api_id,$host) === true)
    {
      $HostPerUserApi = new self;
      
      if($HostPerUserApi->loadWhere('host_per_user_api_id = ?',$host_per_user_api_id))
      {
        $HostPerUserApi->host = $host;

        return $HostPerUserApi->save();
      } 
    }

    return false;
  }

  public static function create(int $user_api_id = null,string $host = null) : bool
  {
    if(isset($user_api_id,$host) === true)
    {
      $HostPerUserApi = new self;
      
      if(!$HostPerUserApi->exist($user_api_id,$host))
      {
        $HostPerUserApi->user_api_id = $user_api_id;
        $HostPerUserApi->host = $host;
        $HostPerUserApi->create_date = time();

        return $HostPerUserApi->save();
      } 
    }

    return false;
  }

  public static function deleteHost(int $host_per_user_api_id = null) : bool
  {
    if(isset($host_per_user_api_id) === true)
    {
      $HostPerUserApi = new self;
      
      if($HostPerUserApi->loadWhere('host_per_user_api_id =  ?',$host_per_user_api_id))
      {
        $HostPerUserApi->status = Constants::DELETE;

        return $HostPerUserApi->save();
      }
    }

    return false;
  }

  public function getUserApiHosts(int $user_api_id = null) 
  {
    if(isset($user_api_id) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.host,
                {$this->tblName}.create_date
              FROM 
                {$this->tblName}
              WHERE
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND 
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->rows($sql);
    }
  }

  public function exist(int $user_api_id = null,string $host = null) : bool
  {
    if(isset($user_api_id,$host) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND 
                {$this->tblName}.host = '{$host}'
              AND 
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public static function isValidHost(int $user_api_id = null,string $host = null) : bool
  {
    return (new self)->exist($user_api_id,$host) || in_array($host, self::HOST_PERMITTED);
  }
}