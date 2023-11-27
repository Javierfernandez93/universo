<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class FieldPerItem extends Orm {
  protected $tblName  = 'field_per_item';
  public $logged = false;

  public function __construct() {
    parent::__construct();
  }

  public function getAllFields(int $item_id = null) : array|bool
  {
    if(isset($item_id) === true)
    {
      $sql = "SELECT 
                field_per_user_api.field_per_user_api_id,
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.item_id,
                field_per_user_api.field,
                field_per_user_api.field_type,
                field_per_user_api.required
              FROM
                {$this->tblName}
              LEFT JOIN 
                field_per_user_api 
              ON 
                field_per_user_api.field_per_user_api_id = {$this->tblName}.field_per_user_api_id
              WHERE 
                {$this->tblName}.status = '1'
              AND 
                {$this->tblName}.item_id = '{$item_id}'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
}