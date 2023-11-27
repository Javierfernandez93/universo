<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Token;

class RemotePelSign extends Orm {
    protected $tblName  = 'remote_pel_sign';

    const DEFAULT_SING_CODE_LENGTH = 7;
    public function __construct() {
        parent::__construct();
    }
    
    public static function generateSignCode()
    {
        $RemotePelSign = new self;

        $RemotePelSign->sign_code = Token::__randomKey(self::DEFAULT_SING_CODE_LENGTH);
        $RemotePelSign->create_date = time();
        
        if($RemotePelSign->save())
        {
            return $RemotePelSign->sign_code;
        }
    }

    public function getUserSignature(string $sign_code = null) 
    {
      if(isset($sign_code) === true)
      {
        $sql = "SELECT    
                  {$this->tblName}.signature 
                FROM 
                  {$this->tblName}
                WHERE 
                  {$this->tblName}.sign_code = '{$sign_code}'
                ";
  
        return $this->connection()->field($sql);
      }
  
      return false;
    }

    public static function attachSignature(string $sign_code = null,string $signature = null) 
    {
      $RemotePelSign = new self;
      
      if($RemotePelSign->loadWhere('sign_code = ?',$sign_code))
      {
        $RemotePelSign->signature = $signature;
        
        return $RemotePelSign->save();
      }
  
      return false;
    }

    public function getRemotePelSignIdByCode(string $sign_code = null) 
    {
      if(isset($sign_code) === true)
      {
        $sql = "SELECT    
                  {$this->tblName}.{$this->tblName}_id
                FROM 
                  {$this->tblName}
                WHERE 
                  {$this->tblName}.sign_code = '{$sign_code}'
                ";
  
        return $this->connection()->field($sql);
      }
  
      return false;
    }
}