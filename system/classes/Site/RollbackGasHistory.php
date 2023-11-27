<?php

namespace Site;

use HCStudio\Orm;

class RollbackGasHistory extends Orm {
  protected $tblName  = 'rollback_gas_history';

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null) : bool
  {
    $RollbackGasHistory = new self;
    $RollbackGasHistory->tron_wallet_id = $data['tron_wallet_id'];
    $RollbackGasHistory->amount = $data['amount'];
    $RollbackGasHistory->txid = $data['txid'];
    $RollbackGasHistory->create_date = time();
    
    return $RollbackGasHistory->save();
  }
}