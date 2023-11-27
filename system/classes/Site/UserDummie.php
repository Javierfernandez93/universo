<?php

namespace Site;

use HCStudio\Orm;

class UserDummie extends Orm {
  protected $tblName  = 'user_dummie';

  public function __construct() {
    parent::__construct();
  }
  
  public static function add(array $data = null) 
  {
    $UserDummie = new self;
    
    $UserDummie->loadWhere('user_login_id = ?', $data['user_login_id']);
    $UserDummie->user_login_id = $data['user_login_id'];
    $UserDummie->dummie_user_login_id = $data['dummie_user_login_id'];
    $UserDummie->create_date = time();

    return $UserDummie->save();
  }

  public function getUser(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.user_login_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->row($sql);
    }
  }

  public function getDummieUserLoginId(int $user_login_id = null) : int
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.dummie_user_login_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";
              
      return $this->connection()->field($sql);
    }

    return 0;
  }
  
  public function hasUserDummie(int $user_login_id = null) : bool
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