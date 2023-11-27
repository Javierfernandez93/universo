<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Connection;
use HCStudio\Token;
use HCStudio\Util;

use JFStudio\Constants;

use Site\FieldPerCustomer;

class Customer extends Orm {
  protected $tblName  = 'customer';

  const UNIQUE_ID_LENGHT = 5;
  const RESELLER = 1;
  const NORMAL_USER = 0;

  public function __construct() {
    parent::__construct();
  }

  public static function generateUniqueId(): string
  {
    return (new Token)->randomKey(self::UNIQUE_ID_LENGHT);
  }

  public static function add(array $data = null) : int|bool
  {
    if(isset($data) == true)
    {
      if(isset($data['whatsapp']) === true)
      {
          $data['unique_id'] = isset($data['unique_id']) ? $data['unique_id'] : self::generateUniqueId();

          $Customer = new self;
          
          if(!$Customer->loadWhere('whatsapp = ? AND user_api_id = ?',[$data['whatsapp'],$data['user_api_id']]))
          {
              $Customer->user_api_id = $data['user_api_id'] ?? '';
              $Customer->unique_id = $data['unique_id'];
              $Customer->name = $data['name'] ?? '';
              $Customer->address = $data['address'] ?? '';
              $Customer->whatsapp = $data['whatsapp'] ? Util::getNumbers($data['whatsapp']) : '';
              $Customer->email = $data['email'] ?? '';
              $Customer->create_date = time();
              $Customer->save();
          }
          
          FieldPerCustomer::addFields($data['extra_fields'],$Customer->getId());

          return $Customer->getId();
      }
      
      return false;
    }

    return false;
  }
  
  public static function edit(array $data = null) : int|bool
  {
    if(isset($data) == true)
    {
        if(isset($data['whatsapp']) === true)
        {
            $Customer = new self;
            
            if($Customer->loadWhere('customer_id = ? AND user_api_id = ?',[$data['customer_id'],$data['user_api_id']]))
            {
                $Customer->unique_id = $data['unique_id'] ?? $Customer->unique_id;
                $Customer->name = $data['name'] ?? $Customer->name;
                $Customer->address = $data['address'] ?? $Customer->address;
                $Customer->whatsapp = $data['whatsapp'] ? Util::getNumbers($data['whatsapp']) : $Customer->whatsapp;
                $Customer->email = $data['email'] ??  $Customer->email;
                
                return $Customer->save() ? $Customer->getId() : false;
            } 
        }
        
        return false;
    }

    return false;
  }

  public function getCustomer(int $user_api_id = null,string $unique_id = null) : array|bool
  {
    if(isset($user_api_id,$unique_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.unique_id,
                {$this->tblName}.address,
                {$this->tblName}.name,
                {$this->tblName}.whatsapp,
                {$this->tblName}.email,
                {$this->tblName}.create_date
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND 
                {$this->tblName}.unique_id = '{$unique_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
 
  public function getCustomerById(int $customer_id = null) : array|bool
  {
    if(isset($customer_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.unique_id,
                {$this->tblName}.address,
                {$this->tblName}.name,
                {$this->tblName}.whatsapp,
                {$this->tblName}.email,
                {$this->tblName}.create_date
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.customer_id = '{$customer_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
 
  public function getCustomerWithAllFieldsById(int $customer_id = null) : array|bool
  {
    if(isset($customer_id) === true) 
    {
      if($customer = $this->getCustomerById($customer_id))
      {
        if($fields = (new FieldPerCustomer)->getAllFields($customer_id))
        {
          $customer = [
            ...$customer,
            ...['fields' => $fields]
          ];
        }

        return $customer;
      }
    }

    return false;
  }

  public function getCustomerIdByUniqueId(int $user_api_id = null,string $unique_id = null) : int|bool
  {
    if(isset($user_api_id,$unique_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND 
                {$this->tblName}.unique_id = '{$unique_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }
  
  public function getAllCustomersForAdmin(int $user_api_id = null) : array|bool
  {
    if(isset($user_api_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.address,
                {$this->tblName}.unique_id,
                {$this->tblName}.name,
                {$this->tblName}.reseller,
                {$this->tblName}.whatsapp,
                {$this->tblName}.email,
                {$this->tblName}.status,
                {$this->tblName}.create_date
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND
                {$this->tblName}.status != '".Constants::DELETE."'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function getPayments(int $user_api_id = null) : array|bool
  {
    if($payments = $this->_getPayments($user_api_id))
    {
      return array_map(function($payment){
        $payment['checkout_url'] = Connection::getMainPath() . "/apps/paymentGateway/process?invoiceTx={$payment['invoice_tx']}";

        return $payment;
      },$payments);
    }

    return false;
  }

  public function _getPayments(int $user_api_id = null) : array|bool
  {
    if(isset($user_api_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.invoice_id,
                {$this->tblName}.amount,
                {$this->tblName}.invoice_tx,
                {$this->tblName}.tron_wallet_id,
                {$this->tblName}.create_date,
                {$this->tblName}.expiration_date,
                tron_wallet.address_base58 as address,
                {$this->tblName}.status 
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                tron_wallet
              ON 
                tron_wallet.tron_wallet_id = {$this->tblName}.tron_wallet_id
              WHERE
                {$this->tblName}.user_api_id = '{$user_api_id}'
              ORDER BY
                {$this->tblName}.create_date
              DESC 
              ";
              
      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function getResellers(int $user_api_id = null) : array|bool
  {
    if(isset($user_api_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.name,
                {$this->tblName}.email,
                {$this->tblName}.address
              FROM 
                {$this->tblName} 
              WHERE
                {$this->tblName}.user_api_id = '{$user_api_id}'
              AND 
                {$this->tblName}.reseller = '".self::RESELLER."'
              ORDER BY
                {$this->tblName}.create_date
              DESC 
              ";
              
      return $this->connection()->rows($sql);
    }

    return false;
  }

  public function exist(string $whatsapp = null) : bool
  {
    if(isset($whatsapp) == true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.whatsapp = '{$whatsapp}'
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              ";
  
      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public static function setAs(int $customer_id = null,int $user_api_id = null,int $status = null) : bool
  {
    if(isset($customer_id,$user_api_id) == true)
    {
      $Customer = new self;
      
      if($Customer->loadWhere('customer_id = ? AND user_api_id = ?',[$customer_id,$user_api_id]))
      {
        $Customer->status = $status;
        
        return $Customer->save();
      }
    }

    return false;
  }

  public function deleteCustomer(string $customer_id = null,int $user_api_id = null) : bool
  {
    if(isset($customer_id,$user_api_id) == true)
    {
      $Customer = new self;
      
      if($Customer->loadWhere('customer_id = ? AND user_api_id = ?',[$customer_id,$user_api_id]))
      {
        $Customer->status = Constants::DELETE;
        
        return $Customer->save();
      }
    }

    return false;
  }

  public function makeReseller(string $customer_id = null,int $user_api_id = null) : bool
  {
    if(isset($customer_id,$user_api_id) == true)
    {
      $Customer = new self;
      
      if($Customer->loadWhere('customer_id = ? AND user_api_id = ?',[$customer_id,$user_api_id]))
      {
        $Customer->reseller = self::RESELLER;
        
        return $Customer->save();
      }
    }

    return false;
  }

  public function deleteReseller(string $customer_id = null,int $user_api_id = null) : bool
  {
    if(isset($customer_id,$user_api_id) == true)
    {
      $Customer = new self;
      
      if($Customer->loadWhere('customer_id = ? AND user_api_id = ?',[$customer_id,$user_api_id]))
      {
        $Customer->reseller = self::NORMAL_USER;

        return $Customer->save();
      }
    }

    return false;
  }
}