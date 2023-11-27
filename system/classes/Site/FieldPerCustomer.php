<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class FieldPerCustomer extends Orm {
  protected $tblName  = 'field_per_customer';
  public $logged = false;

  public function __construct() {
    parent::__construct();
  }

  public static function addFields(array $fields = null,int $customer_id = null)
  { 
    if(isset($fields,$customer_id))
    {
      $fields = array_filter($fields);

      foreach($fields as $field_per_user_api_id => $value)
      {
        if($field_per_user_api_id)
        {
          self::addField([
            'field_per_user_api_id' => $field_per_user_api_id,
            'value' => $value
          ],$customer_id);
        }
      }
    }
  }

  public static function addField(array $field = null,int $customer_id = null)
  {
    $FieldPerCustomer = new self;
    
    if(!$FieldPerCustomer->loadWhere('field_per_user_api_id = ? AND customer_id = ?',[$field['field_per_user_api_id'],$customer_id]))
    {
      $FieldPerCustomer->field_per_user_api_id = $field['field_per_user_api_id'];
      $FieldPerCustomer->create_date = time();
      $FieldPerCustomer->customer_id = $customer_id;
    }
    $FieldPerCustomer->value = $field['value'];

    return $FieldPerCustomer->save();
  }

  public function getAllFields(int $customer_id = null)
  {
    if(isset($customer_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.value,
                field_per_user_api.field
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                field_per_user_api
              ON 
                field_per_user_api.field_per_user_api_id = {$this->tblName}.field_per_user_api_id
              WHERE 
                {$this->tblName}.customer_id = '{$customer_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
}