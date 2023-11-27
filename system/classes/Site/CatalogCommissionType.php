<?php

namespace Site;

use HCStudio\Orm;

class CatalogCommissionType extends Orm {
  protected $tblName  = 'catalog_commission_type';

  const NETWORK = 'network';
  const NETWORK_FUND_ACCOUNT = 'network_fund_account';
  const NETWORK_MARKETING_ACCOUNT = 'network_marketing_account';
  const NETWORK_MAM = 'network_mam';
  const FUND_MAMP = 'fund_mamp';
  const GROUP = 'group';
  const ATI_MEMBERSHIP = 'ati_membership';
  const DUMMIE_TRADING_MEMBERSHIP = 'dummie_membership';
  
  const NETWORK_TYPE_ID = 1;
  const GROUP_TYPE_ID = 2;
  const NETWORK_MAM_ID = 3;
  const FUND_MAM_ID = 4;
  const RESIDUAL_MAM = 5;
  const DUMMIE_TRADING_MEMBERSHIP_ID = 9;
  const ATI_MEMBERSHIP_ID = 10;

  public function __construct() {
    parent::__construct();
  }
  
  public function getAll() {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.title,
              {$this->tblName}.commission_type
            FROM 
              {$this->tblName}
            WHERE
              {$this->tblName}.status = '1'
            ";
    return $this->connection()->rows($sql);
  }
}