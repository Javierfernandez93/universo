<?php

namespace Site;

use HCStudio\Orm;

class UserAti extends Orm {
  protected $tblName  = 'user_ati';

  const WAITING_FOR_CREDENTIALS = 1;
  const ACTIVE = 2;
  public function __construct() {
    parent::__construct();
  }
  
  public static function add(array $data = null) : bool 
  {
    $UserAti = new self;

    $UserAti->user_login_id = isset($data['user_login_id']) ? $data['user_login_id'] : $UserAti->user_login_id;
    $UserAti->status = self::WAITING_FOR_CREDENTIALS;
    $UserAti->create_date = time();
    
    return $UserAti->save();
  }
  
  public static function addAtiCredentials(array $data = null) : bool 
  {
    $UserAti = new self;
    $UserAti->loadWhere("user_login_id = ?",$data['user_login_id']);

    $UserAti->user_ebot = isset($data['user_ebot']) ? $data['user_ebot'] : $UserAti->user_ebot;
    $UserAti->password_ebot = isset($data['password_ebot']) ? $data['password_ebot'] : $UserAti->password_ebot;
    $UserAti->user = isset($data['user']) ? $data['user'] : $UserAti->user;
    $UserAti->password = isset($data['password']) ? $data['password'] : $UserAti->password;
    $UserAti->serial_key = isset($data['serial_key']) ? $data['serial_key'] : $UserAti->serial_key;
    $UserAti->ip = isset($data['ip']) ? $data['ip'] : $UserAti->ip;
    $UserAti->status = self::ACTIVE;
    
    return $UserAti->save();
  }

  public static function addDerivAccount(array $data = null) : bool 
  {
    $UserAti = new self;
    $UserAti->loadWhere("user_login_id = ?",$data['user_login_id']);
    $UserAti->deriv_server = $data['deriv_server'];
    $UserAti->deriv_login = $data['deriv_login'];
    $UserAti->deriv_password = isset($data['deriv_password']) ? $data['deriv_password'] : '';
    
    return $UserAti->save();
  }

  public function getUser(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.user_ebot,
                  {$this->tblName}.password_ebot,
                  {$this->tblName}.user,
                  {$this->tblName}.ip,
                  {$this->tblName}.deriv_password,
                  {$this->tblName}.deriv_login,
                  {$this->tblName}.deriv_server,
                  {$this->tblName}.password,
                  {$this->tblName}.serial_key,
                  {$this->tblName}.status,
                  {$this->tblName}.create_date
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->row($sql);
    }
  }
  
  public function getAll() 
  {
    $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.user_ebot,
                {$this->tblName}.password_ebot,
                {$this->tblName}.user,
                {$this->tblName}.ip,
                {$this->tblName}.deriv_password,
                {$this->tblName}.deriv_login,
                {$this->tblName}.deriv_server,
                {$this->tblName}.serial_key,
                {$this->tblName}.password,
                {$this->tblName}.status,
                {$this->tblName}.create_date,
                user_login.email,
                user_data.user_login_id,
                user_data.names
            FROM 
              {$this->tblName}
            LEFT JOIN 
              user_data 
            ON 
              user_data.user_login_id = {$this->tblName}.user_login_id
            LEFT JOIN 
              user_login 
            ON 
              user_login.user_login_id = {$this->tblName}.user_login_id
            WHERE 
              {$this->tblName}.status != '-1'
            ";
            
    return $this->connection()->rows($sql);
  }
  
  public function hasUserAti(int $user_login_id = null) : bool
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
}