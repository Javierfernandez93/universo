<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class RollbackMainWalletHistory extends Orm {
  protected $tblName  = 'rollback_main_wallet_history';

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null) : bool
  {
    $RollbackMainWalletHistory = new self;
    $RollbackMainWalletHistory->payment_gateway_id = $data['payment_gateway_id'];
    $RollbackMainWalletHistory->txid = $data['txid'];
    $RollbackMainWalletHistory->create_date = time();
    
    return $RollbackMainWalletHistory->save();
  }

  public function getTxId(int $payment_gateway_id = null) : bool|string
  {
    if(isset($payment_gateway_id) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.txid
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.payment_gateway_id = '{$payment_gateway_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";
      
      if($txid = $this->connection()->field($sql))
      {
        return $txid;
      }
    }

    return false;
  }
}