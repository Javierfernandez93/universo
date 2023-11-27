<?php

namespace Site;

use HCStudio\Orm;

class CatalogMarketingField extends Orm {
  protected $tblName  = 'catalog_marketing_field';
  public function __construct() {
    parent::__construct();
  }

  public function getIdByOrderAndType(string $type = null,int $order_number = null) 
  {
    if(isset($type,$order_number))
    {
        $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id
                FROM 
                  {$this->tblName}
                WHERE 
                  {$this->tblName}.type = '{$type}'
                AND  
                  {$this->tblName}.order_number = '{$order_number}'
                AND  
                  {$this->tblName}.status = '1'
                ";
                
        return $this->connection()->field($sql);
    }

    return false;
  }
}