<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

use Site\GainPerUser;
use Site\UserContact;

class UserTradingAccount extends Orm {
  protected $tblName  = 'user_trading_account';

  const WAITING = 0;
  const IN_PROGRESS = 1;
  const FINISH = 2;
  const EXPIRED = 3;
  const DECLINED = 4;

  public function __construct() {
    parent::__construct();
  }

  public function _getAllForDisperseGains() 
  {
    if($users = $this->getAll("'".self::IN_PROGRESS."'"))
    {
      $UserData = new UserData;
      $GainPerUser = new GainPerUser;
      
      return array_map(function($user) use($UserData,$GainPerUser) {
        $user['names'] = $UserData->getNames($user['user_login_id']);
        $user['hasGain'] = $GainPerUser->hasGainOnWeek($user['user_login_id']);
        
        if($user['hasGain'])
        {
          $user['gain'] = $GainPerUser->getGainOnWeek($user['user_login_id']);
        }

        return $user;
      },$users);
    }

    return false;
  }

  public function _getAll(string $statusIn = null) 
  {
    if($users = $this->getAll($statusIn))
    {
      $UserData = new UserData;
      
      return array_map(function($user) use($UserData) {
        $user['names'] = $UserData->getNames($user['user_login_id']);

        return $user;
      },$users);
    }

    return false;
  }
  
  public function _get(int $user_login_id = null) 
  {
    if(isset($user_login_id) == true)
    {
      if($user = $this->get($user_login_id))
      {
        $UserData = new UserData;
        
        $user['names'] = $UserData->getNames($user['user_login_id']);

        return $user;
      }
    }

    return false;
  }

  public function getAll(string $statusIn = null) 
  {
    $filter = isset($statusIn) ? "WHERE {$this->tblName}.status IN({$statusIn})" : '';

    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.user_login_id,
              {$this->tblName}.user_name,
              {$this->tblName}.password,
              {$this->tblName}.url,
              {$this->tblName}.create_date,
              {$this->tblName}.status
            FROM
              {$this->tblName}
              {$filter}
            ";
            
    return $this->connection()->rows($sql);
  }
  
  public function get(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    { 
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.user_name,
                {$this->tblName}.password,
                {$this->tblName}.url,
                {$this->tblName}.create_date,
                {$this->tblName}.status
              FROM
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.status = '".self::IN_PROGRESS."'
              ";
              
      return $this->connection()->row($sql);
    }

    return false;
  }
  
  public static function add(array $data = null) 
  {
    if(isset($data) === true)
    { 
      if(!(new UserTradingAccount)->exist($data['user_login_id']))
      {
        $UserTradingAccount = new UserTradingAccount;
        $UserTradingAccount->user_login_id = $data['user_login_id'];
        $UserTradingAccount->user_name = $data['user_name'];
        $UserTradingAccount->password = $data['password'];
        $UserTradingAccount->url = $data['url'];
        $UserTradingAccount->create_date = time();
        
        return $UserTradingAccount->save();
      }
    }

    return false;
  }

  public function exist(int $user_login_id = null) : bool 
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT
                {$this->tblName}.user_login_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
              AND
                {$this->tblName}.status != '".Constants::DELETE."'
              ";
              
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function hasAccountStatus(int $user_login_id = null,string $statusIn = null) 
  {
    if(isset($user_login_id) === true) 
    {
      $filter = $statusIn ? "AND {$this->tblName}.status IN({$statusIn})" : '';

      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
                {$filter}
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public static function setTraddingAccountAs(int $user_trading_account_id = null,int $status = null) : bool
  {
    if(isset($user_trading_account_id,$status) == true)
    {
      $UserTradingAccount = new UserTradingAccount;

      if($UserTradingAccount->loadWhere('user_trading_account_id = ?',$user_trading_account_id))
      {
        $UserTradingAccount->status = $status;
        
        return $UserTradingAccount->save();
      }
    }

    return false;
  }

  public static function sendWhatsAppActivation(array $data = null) 
  {
    return ApiWhatsApp::sendWhatsAppMessage([
        'message' => ApiWhatsAppMessages::getUserPendingActivationMessage(),
        'image' => null,
        'contact' => [
            "phone" => (new UserContact)->getWhatsApp($data['user_login_id']),
            "name" => $data['names'] ?? 'Miembro de CapitalPayments',
        ]
    ]);
  }

  public static function sendCredentials(array $data = null) 
  {
    return ApiWhatsApp::sendWhatsAppMessage([
        'message' => ApiWhatsAppMessages::getUserTradingCredentialsMessage(),
        'image' => null,
        'contact' => [
            "phone" => (new UserContact)->getWhatsApp($data['user_login_id']),
            "name" => $data['name'] ?? 'Miembro de CapitalPayments',
            "user_name" => $data['user_name'] ?? 'Error',
            "client_password" => $data['password'] ?? 'Error',
            "url" => $data['url'] ?? 'Error'
        ]
    ]);
  }
}