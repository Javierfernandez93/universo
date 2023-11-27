<?php

namespace Site;

use HCStudio\Orm;

class CatalogCommission extends Orm {
  protected $tblName  = 'catalog_commission';

  const DINAMIC_LEVEL = 0;

  public function __construct() {
    parent::__construct();
  }

  public static function unformatCommission(array $catalog_commission_per_user_ids = null)
  {
    if($catalog_commission_per_user_ids)
    {
      $CatalogCommission = new CatalogCommission;
      
      return array_map(function($catalog_commission_per_user_id) use($CatalogCommission) {
        return $CatalogCommission->get($catalog_commission_per_user_id);
      },$catalog_commission_per_user_ids);
    }
  }
  
  public function get(int $catalog_commission_id = null)
  {
    if(isset($catalog_commission_id) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.catalog_commission_type_id,
                {$this->tblName}.amount,
                {$this->tblName}.is_percentaje,
                catalog_commission_type.commission_type,
                {$this->tblName}.level
              FROM 
                {$this->tblName}
              LEFT JOIN 
                catalog_commission_type
              ON 
                catalog_commission_type.catalog_commission_type_id = {$this->tblName}.catalog_commission_type_id
              WHERE
                {$this->tblName}.catalog_commission_id = '{$catalog_commission_id}'
                ";

      return $this->connection()->row($sql);
    }

    return false;
  }
  
  public function getIn(string $catalog_commission_id_in = null)
  {
    if(isset($catalog_commission_id_in) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.catalog_commission_type_id,
                {$this->tblName}.amount,
                {$this->tblName}.is_percentaje,
                catalog_commission_type.commission_type,
                {$this->tblName}.level
              FROM 
                {$this->tblName}
              LEFT JOIN 
                catalog_commission_type
              ON 
                catalog_commission_type.catalog_commission_type_id = {$this->tblName}.catalog_commission_type_id
              WHERE
                {$this->tblName}.catalog_commission_id IN({$catalog_commission_id_in})
                ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function getAllBycatalogCommissionTypeId(string $catalog_commission_type_id = null)
  {
    if(isset($catalog_commission_type_id) === true)
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.catalog_commission_type_id,
                {$this->tblName}.amount,
                {$this->tblName}.is_percentaje,
                catalog_commission_type.commission_type,
                {$this->tblName}.level
              FROM 
                {$this->tblName}
              LEFT JOIN 
                catalog_commission_type
              ON 
                catalog_commission_type.catalog_commission_type_id = {$this->tblName}.catalog_commission_type_id
              WHERE
                {$this->tblName}.catalog_commission_type_id = '{$catalog_commission_type_id}'
                ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
}