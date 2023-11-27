<?php

namespace Site;

use HCStudio\Orm;

class CatalogBridgeBuyType extends Orm {
  protected $tblName  = 'catalog_bridge_buy_type';

  const BRIDGE_FUNDS = 1;
  const MAM = 2;

  public function __construct() {
    parent::__construct();
  }

  public function getAll() 
  {
    $sql = "SELECT
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.type
            FROM 
              {$this->tblName}
            WHERE 
              {$this->tblName}.status = '1'
            ";
            
    return $this->connection()->rows($sql);
  }
}