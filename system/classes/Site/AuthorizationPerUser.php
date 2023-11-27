<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Token;

use Site\UserData;
use Site\UserContact;

class AuthorizationPerUser extends Orm {
  protected $tblName  = 'authorization_per_user';

  const WAITING = 1;
  const PROCESS = 2;
  const EXPIRED = -1;

  const LENGTH_CODE = 4;

  public function __construct() {
    parent::__construct();
  }

  public static function parseCodes(array $codes = null) : string
  {
    return implode('',array_column($codes,'value'));
  }

  public static function expireAuth(string $token_key = null) : bool
  {
    $AuthorizationPerUser = new self;

    if($AuthorizationPerUser->loadWhere('token_key = ?',$token_key))
    {
      $AuthorizationPerUser->status = self::EXPIRED;

      return $AuthorizationPerUser->save();
    }
  }

  public static function checkTokenCode(array $data = null) : bool
  {
    $data['code'] = self::parseCodes($data['codes']);

    $AuthorizationPerUser = new self;

    if($AuthorizationPerUser->isValidCode($data))
    {
      if($AuthorizationPerUser->loadWhere('code = ?', $data['code']))
      {
        $AuthorizationPerUser->status = self::PROCESS;
        $AuthorizationPerUser->authorization_date = time();
        
        return $AuthorizationPerUser->save();
      }
    }

    return false;
  }

  public static function sendToWhatsApp(array $data = null) : array|bool {
    return ApiWhatsApp::sendWhatsAppMessage([
        'message' => ApiWhatsAppMessages::getRequestMessage(),
        'image' => null,
        'contact' => [
            "phone" => (new UserContact)->getWhatsApp($data['user_login_id']),
            "name" => trim((new UserData)->getNames($data['user_login_id'])),
            "extra" => $data['code'],
            "url" => $data['url'],
        ]
    ]);
  }

  public static function send(array $data = null) : bool
  {
    self::sendToWhatsApp($data);
    // self::sendToEmail($data);

    return true;
  }
  
  public static function applyControlData(array $data = null) : array
  {
    return [
        ...$data,
        ...['agent' => $_SERVER['HTTP_USER_AGENT']]
    ];
  }

  public function hasValidAuth(string $token_key = null) : bool
  {
    if(isset($token_key) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.token_key = '{$token_key}'
              AND 
                {$this->tblName}.status = '".self::PROCESS."'
              ";
              
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }
  
  public function isValidCode(array $data = null) : bool
  {
    if(isset($data) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.token_key = '{$data['key']}'
              AND 
                {$this->tblName}.code = '{$data['code']}'
              AND 
                {$this->tblName}.user_login_id = '{$data['user_login_id']}'
              AND 
                {$this->tblName}.status = '".self::WAITING."'
              ";
      
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public static function getAuth(array $data = null) : array|bool
  {
    return false;
  }

  public static function requestNewAuth(array $data = null) : array|bool
  {
    $AuthorizationPerUser = new self;

    $data = self::applyControlData($data);
    
    if($token = (new Token)->getToken($data))
    {
      $AuthorizationPerUser->token_token = $token['token'];
      $AuthorizationPerUser->token_key = $token['key'];
      $AuthorizationPerUser->user_login_id = $data['user_login_id'];
      $AuthorizationPerUser->data = json_encode($data);
      $AuthorizationPerUser->code = Token::__randomKey(self::LENGTH_CODE);
      $AuthorizationPerUser->create_date = time();
      
      if($AuthorizationPerUser->save())
      {
        self::send([
          'user_login_id' =>$data['user_login_id'],
          'code' => $AuthorizationPerUser->code,
          'url' => "{$data['region']}, {$data['ip']}, {$data['agent']}", // info
        ]);

        return [
          'requestQuery' => $data['requestQuery'],
          'key' => $token['key']
        ];
      }
    }

    return false;
  }
}