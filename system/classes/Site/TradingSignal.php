<?php

namespace Site;

use HCStudio\Orm;
use JFStudio\Constants;

class TradingSignal extends Orm {
  protected $tblName  = 'trading_signal';

  public function __construct() {
    parent::__construct();
  }
  
  public static function add(array $data = null) : bool
  {
    if(isset($data) === true)
    {
        $TradingSignal = new self;
        $TradingSignal->user_support_id = $data['user_support_id'];
        $TradingSignal->message = $data['message'];
        $TradingSignal->create_date = time();

        $TradingSignal->connection()->stmtQuery("SET NAMES utf8mb4");
        
        return $TradingSignal->save();
    }

    return false;
  }
    
  public function getAll() 
  {
    $sql = "SELECT
              {$this->tblName}.user_support_id,
              {$this->tblName}.message,
              {$this->tblName}.create_date,
              user_support.names
            FROM 
              {$this->tblName}
            LEFT JOIN 
              user_support
            ON 
              user_support.user_support_id = {$this->tblName}.user_support_id
            WHERE 
              {$this->tblName}.status = '".Constants::AVIABLE."'
            ";
            
    $this->connection()->stmtQuery("SET NAMES utf8mb4");

    return $this->connection()->rows($sql);
  }
}