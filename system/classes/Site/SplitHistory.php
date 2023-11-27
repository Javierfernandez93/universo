<?php

namespace Site;

use HCStudio\Orm;
use JFStudio\Constants;

class SplitHistory extends Orm {
  protected $tblName  = 'split_history';

  public function __construct() {
    parent::__construct();
  }

  public function getRecordsCount(int $split_id = null) : int
  {
    if(isset($split_id) === true) 
    {
      $sql = "SELECT 
                COUNT({$this->tblName}.{$this->tblName}_id) as c
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.split_id = '{$split_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql);
    }

    return 0;
  }
}