<?php

namespace Site;

use Site\CatalogMarketingField;

use JFStudio\Constants;

use HCStudio\Orm;

class MarketingFieldPerUser extends Orm {
  protected $tblName  = 'marketing_field_per_user';

  const PENDING = 0;
  const SENT = 1;

  const TYPES = ['info','post','history','reel'];

  public function __construct() {
    parent::__construct();
  }
  
  public static function attachFeedBack(array $data = null) : bool 
  {
    $MarketingFieldPerUser = new self;
    
    if(($MarketingFieldPerUser->loadWhere("marketing_field_per_user_id = ?",$data['marketing_field_per_user_id'])))
    {
      $MarketingFieldPerUser->feedback = $data['feedback'];

      return $MarketingFieldPerUser->save();
    }

    return false;
  }

  public static function hasItemSku(array $item = null,string $sku = null) : bool 
  {
    return $item['sku'] == $sku;
  }

  public static function addInfoData(int $user_login_id = null) 
  {
    foreach([1,2,3,4,5,6,19] as $catalog_marketing_field_id)
    {
      $MarketingFieldPerUser = new self;
  
      if(!$MarketingFieldPerUser->exist($catalog_marketing_field_id,$user_login_id))
      {
        $MarketingFieldPerUser->catalog_marketing_field_id = $catalog_marketing_field_id;
        $MarketingFieldPerUser->user_login_id = $user_login_id;
        $MarketingFieldPerUser->create_date = time();
        
        $MarketingFieldPerUser->save();
      }
    }
  }

  public static function _add(array $data = null) 
  {
    $CatalogMarketingField = new CatalogMarketingField;

    for($i = 1;$i <= $data['quantity'];$i++)
    {
      if($catalog_marketing_field_id = $CatalogMarketingField->getIdByOrderAndType($data['type'],$i))
      {
        $MarketingFieldPerUser = new self;

        if(!$MarketingFieldPerUser->exist($catalog_marketing_field_id,$data['user_login_id']))
        {
          $MarketingFieldPerUser->catalog_marketing_field_id = $catalog_marketing_field_id;
          $MarketingFieldPerUser->user_login_id = $data['user_login_id'];
          $MarketingFieldPerUser->create_date = time();
          
          $MarketingFieldPerUser->save();
        }
      }
    }
  }

  public static function add(array $data = null) : bool 
  {
    if(isset($data['items'][0]['products']))
    {
      self::addInfoData($data['user_login_id']);

      foreach($data['items'][0]['products'] as $item)
      {
        if(self::hasItemSku($item['product'],Product::POST))
        {
          self::_add([
            'user_login_id' => $data['user_login_id'],
            'quantity' => $item['quantity'],
            'type' => 'post'
          ]);
        } else if(self::hasItemSku($item['product'],Product::STORIES)) {
          self::_add([
            'user_login_id' => $data['user_login_id'],
            'quantity' => $item['quantity'],
            'type' => 'history'
          ]);
        } else if(self::hasItemSku($item['product'],Product::REEL)) {
          self::_add([
            'user_login_id' => $data['user_login_id'],
            'quantity' => $item['quantity'],
            'type' => 'reel'
          ]);
        }
      }
    }

    return false;
  }

  public static function update(array $data = null) : bool 
  {
    if(isset($data))
    {
      $MarketingFieldPerUser = new self;
      
      if($MarketingFieldPerUser->loadWhere('user_login_id = ? AND catalog_marketing_field_id = ?',[$data['user_login_id'],$data['catalog_marketing_field_id']]))
      {
        $MarketingFieldPerUser->value = json_encode($data['value']);
        $MarketingFieldPerUser->status = self::SENT;
        
        return $MarketingFieldPerUser->save();
      }
    }

    return false;
  }

  public function getAllPendingTypes(int $user_login_id = null) : array|bool
  {
    $data = [];

    if(isset($user_login_id) === true)
    {
      foreach(self::TYPES as $type)
      {
        $data[] = [
          'type' => $type,
          'fields' => $this->getAllPending($type,$user_login_id)
        ];
      }
    }
    
    return $data;
  }

  public function getAllPending(string $type = null,int $user_login_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      if($fields = $this->_getAllPending($type,$user_login_id))
      {
        return array_map(function($field){
            $field['data'] = json_decode($field['data'], true);

            return $field;
        },$fields);
      }
    }
    
    return false;
  }
  
  public function exist(string $catalog_marketing_field_id = null,int $user_login_id = null) : bool
  {
    if(isset($catalog_marketing_field_id,$user_login_id) === true)
    {
      $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id
                FROM 
                    {$this->tblName}
                WHERE 
                    {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                    {$this->tblName}.catalog_marketing_field_id = '{$catalog_marketing_field_id}'
              ";
              
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function _getAllPending(string $type = null,int $user_login_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.catalog_marketing_field_id,
                    {$this->tblName}.value,
                    catalog_marketing_field.title,
                    catalog_marketing_field.description,
                    catalog_marketing_field.type,
                    catalog_marketing_field.data
                FROM 
                    {$this->tblName}
                LEFT JOIN
                    catalog_marketing_field
                ON
                    catalog_marketing_field.catalog_marketing_field_id = {$this->tblName}.catalog_marketing_field_id
                WHERE 
                    {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                    catalog_marketing_field.type = '{$type}'
                AND 
                    {$this->tblName}.status = '".self::PENDING."'
                ORDER BY 
                  catalog_marketing_field.order_number 
                ASC 
              ";
              
      return $this->connection()->rows($sql);
    }

    return false;
  }

  public function getAll() : array|bool
  {
    $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id,
                  user_login.company_id,
                  user_login.email,
                  user_data.names
              FROM 
                  {$this->tblName}
              LEFT JOIN
                  user_login
              ON
                  user_login.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN
                  user_data
              ON
                  user_data.user_login_id = {$this->tblName}.user_login_id
              WHERE 
                  {$this->tblName}.status != '".Constants::DELETE."'
              GROUP BY 
                {$this->tblName}.user_login_id
            ";
            
    return $this->connection()->rows($sql);
  }

  public function getAllPendingTypesAdmin(int $user_login_id = null) : array|bool
  {
    $data = [];

    if(isset($user_login_id) === true)
    {
      foreach(self::TYPES as $type)
      {
        $data[] = [
          'type' => $type,
          'fields' => $this->getAllForAdmin($type,$user_login_id)
        ];
      }
    }
    
    return $data;
  }

  public function getAllForAdmin(string $type = null,int $user_login_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      if($fields = $this->_getAllForAdmin($type,$user_login_id))
      {
        return array_map(function($field){
            $field['data'] = json_decode($field['data'], true);
            
            if($field['value'] ?? false)
            {
              $field['value'] = json_decode($field['value'], true);
            }

            return $field;
        },$fields);
      }
    }
    
    return false;
  }

  public function _getAllForAdmin(string $type = null,int $user_login_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.catalog_marketing_field_id,
                    {$this->tblName}.value,
                    catalog_marketing_field.feedback,
                    catalog_marketing_field.title,
                    catalog_marketing_field.description,
                    catalog_marketing_field.type,
                    catalog_marketing_field.data
                FROM 
                    {$this->tblName}
                LEFT JOIN
                    catalog_marketing_field
                ON
                    catalog_marketing_field.catalog_marketing_field_id = {$this->tblName}.catalog_marketing_field_id
                WHERE 
                    {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                    catalog_marketing_field.type = '{$type}'
                AND 
                    {$this->tblName}.status != '".Constants::DELETE."'
                ORDER BY 
                  catalog_marketing_field.order_number 
                ASC 
              ";
              
      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function getAllMarketingFeedBacksMain(int $user_login_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.catalog_marketing_field_id,
                    {$this->tblName}.value,
                    {$this->tblName}.feedback,
                    catalog_marketing_field.title,
                    catalog_marketing_field.description,
                    catalog_marketing_field.type,
                    catalog_marketing_field.data
                FROM 
                    {$this->tblName}
                LEFT JOIN
                    catalog_marketing_field
                ON
                    catalog_marketing_field.catalog_marketing_field_id = {$this->tblName}.catalog_marketing_field_id
                WHERE 
                    {$this->tblName}.user_login_id = '{$user_login_id}'
                AND 
                    {$this->tblName}.feedback != ''
                AND 
                    {$this->tblName}.status != '".Constants::DELETE."'
                ORDER BY 
                  catalog_marketing_field.order_number 
                ASC 
              ";
              
      return $this->connection()->rows($sql);
    }

    return false;
  }
}