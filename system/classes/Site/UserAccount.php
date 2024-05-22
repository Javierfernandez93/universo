<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Util;

class UserAccount extends Orm {
  protected $tblName  = 'user_account';
  const DEFAULT_IMAGE = '../../src/img/user/user.png';
  const DEFAULT_TIME_ZONE  = 'America/Mexico_City';

  public function __construct() {
    parent::__construct();
  }
  
  public static function setOnManivela(int $user_login_id = null) : bool
  {
    if(!isset($user_login_id))
    {
      return false;
    }

    $UserAccount = new self;
    
    if(!$UserAccount->loadWhere('user_login_id = ?',$user_login_id)) 
    {
      return false;
    }

    if($UserAccount->on_manivela)
    {
      return true;
    }
    
    $UserAccount->on_manivela = 1;

    return $UserAccount->save();
  }

  public function getTimeZone(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT 
                catalog_timezone.timezone
              FROM
                {$this->tblName}
              LEFT JOIN 
                catalog_timezone
              ON 
                catalog_timezone.catalog_timezone_id = {$this->tblName}.catalog_timezone_id
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
      return $this->connection()->field($sql);
    }
  }

  public function existLanding(int $user_login_id = null,string $landing = null) 
  {
    if(isset($user_login_id,$landing) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_login_id != '{$user_login_id}'
              AND 
                {$this->tblName}.landing = '{$landing}'
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function getIdByLanding(string $landing = null) 
  {
    if(isset($landing) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.landing = '{$landing}'
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }
  
  public function isUniqueLanding(string $landing = null) : bool
  {
    if(isset($landing) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.landing = '{$landing}'
              ";

      return $this->connection()->field($sql) ? false : true;
    }

    return false;
  }
  
  public function getLandingById(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.landing
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }

  public static function formatLandingByEmail(string $email = null) : string
  {
    if(isset($email) === true)
    {
      $email = explode('@',$email);
      
      return Util::sanitizeString(strtolower($email[0]));
    }

    return '';
  }
}