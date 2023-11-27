<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

use Site\SplitHistory;
use Site\Item;

class Split extends Orm {
  protected $tblName  = 'split';

  public function __construct() {
    parent::__construct();
  }

  public static function remove(int $split_id = null) : bool|int {
    $Split = new self;
    
    if($Split->loadWhere('split_id = ?',[$split_id]))
    {
      $Split->status = Constants::DELETE;

      return $Split->save();
    }

    return false;
  }

  public static function add(array $data = null) : bool|int {
    $Split = new self;
    
    if(!$Split->hasSplit($data['item_id'],$data['customer_id']))
    {
      $Split->item_id = $data['item_id'];
      $Split->customer_id = $data['customer_id'];
      $Split->recurring = $data['recurring'] ? 1 : 0;
      $Split->amount = $data['amount'];
      $Split->create_date = time();
    
      if($short_url = ShortUrl::addShort([
        'title' => "Split for {$data['item_id']}",
        'user_login_id' => $data['user_login_id'],
        'url' => Item::getURLBaseForItemPlugin($data['url_data'])
      ])){
        $Split->short_url_id = $short_url['short_url_id'];
      }

      if($Split->save())
      {
        return $Split->getId();
      }
    }

    return false;
  }

  public static function countSplits(int $item_id = null) 
  {
    return sizeof((new self)->_getSplitsToPay($item_id));
  }
  
  public static function _getSplitsToPay(int $item_id = null) : array
  {
    if(isset($item_id) === true) 
    {
      $Split = new self;

      if($splits = $Split->getSplits($item_id))
      {
        $splits = array_filter(array_map(function($split){
          $split['aviable_to_pay'] = self::isRecurringAviable($split);
          
          return $split;
        },$splits),function($split) {
          return $split['aviable_to_pay'] && $split['address'];
        });
    
        return $splits;
      }
    }

    return [];
  }

  public static function getSplitsToPay(int $item_id = null) : array|bool
  {
    if(isset($item_id) === true) 
    {
      $Split = new self;
      
      $splits = $Split->_getSplitsToPay($item_id);
    
      if(sizeof($splits) > 0)
      {
        return [
          'amount_to_split' => array_sum(array_column($splits,"amount")),
          'splits' => $splits,
        ];
      }
    }

    return false;
  }

  public static function isRecurringAviable(array $data = null) : bool|array
  {
    if($data['recurring'])
    {
      return true;
    }

    return ((new SplitHistory)->getRecordsCount($data['split_id']) == 0);
  }

  public function get(int $item_id = null) : bool|array
  {
    if(isset($item_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.customer_id,
                {$this->tblName}.recurring,
                customer.address,
                {$this->tblName}.amount
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                customer
              ON 
                customer.customer_id = {$this->tblName}.customer_id
              WHERE 
                {$this->tblName}.item_id = '{$item_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
  
  public function getSplits(int $item_id = null) : bool|array
  {
    if(isset($item_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.customer_id,
                {$this->tblName}.recurring,
                {$this->tblName}.amount,
                customer.address
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                customer
              ON 
                customer.customer_id = {$this->tblName}.customer_id
              WHERE 
                {$this->tblName}.item_id = '{$item_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function getSplitItemByCustomer(int $customer_id = null,int $item_id = null) : bool|array
  {
    if(isset($item_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.customer_id,
                {$this->tblName}.recurring,
                {$this->tblName}.amount
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.customer_id = '{$customer_id}'
              AND 
                {$this->tblName}.item_id = '{$item_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
  
  public function getSplitItemByReferralCustomer(int $referral_customer_id = null,int $item_id = null) : bool|array
  {
    if(isset($item_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.referral_customer_id,
                {$this->tblName}.customer_id,
                {$this->tblName}.recurring,
                {$this->tblName}.amount,
                customer.name,
                customer.whatsapp,
                customer.email
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                customer 
              ON 
                customer.customer_id = {$this->tblName}.customer_id
              WHERE 
                {$this->tblName}.referral_customer_id = '{$referral_customer_id}'
              AND 
                {$this->tblName}.item_id = '{$item_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function hasSplit(int $item_id = null,int $customer_id = null) : bool
  {
    if(isset($item_id,$customer_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.item_id = '{$item_id}'
              AND 
                {$this->tblName}.customer_id = '{$customer_id}'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function getAll(int $user_api_id = null) : bool|array
  {
    if(isset($user_api_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.customer_id,
                {$this->tblName}.recurring,
                {$this->tblName}.amount,
                item.title,
                item.item_id,
                customer.whatsapp,
                customer.email,
                customer.name
              FROM 
                item
              LEFT JOIN 
                split 
              ON 
                split.item_id = item.item_id
              LEFT JOIN 
                customer 
              ON 
                customer.customer_id = {$this->tblName}.customer_id
              WHERE 
                item.user_api_id = '{$user_api_id}'
              AND
                item.status = '".Constants::AVIABLE."'
              AND
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }

  public function getSplitsByCustomer(int $user_api_id = null,int $referral_customer_id = null) : array|bool
  {
    if($items = (new Item)->getAllItems($user_api_id))
    {
      $ShortUrl = new ShortUrl;

      return array_map(function($item) use($ShortUrl,$referral_customer_id) {
        $item['splits'] = [];
        
        if($splits = $this->getSplitItemByReferralCustomer($referral_customer_id,$item['item_id']))
        {
          $item['splits'] = $splits;
          // $item['split']['short_url'] = $ShortUrl->get($item['split']['split_id']);
        }

        return $item;
      },$items);
    }

    return false;
  }
  
  public function updateSplitAmount(array $data = null) : array|bool
  {
    $Split = new self;
    
    if($Split->loadWhere('split_id = ?',[$data['split_id']]))
    {
      $Split->amount = $data['amount'];

      return $Split->save();
    }

    return false;
  }
  
  public function updateSplit(array $data = null) : array|bool
  {
    $Split = new self;
    
    if(isset($data['split_id']))
    {
      $Split->loadWhere('split_id = ?',[$data['split_id']]);
    } else {
      $Split->create_date = time();
    }

    $Split->item_id = $data['item_id'];
    $Split->referral_customer_id = $data['referral_customer_id'];
    $Split->customer_id = $data['customer_id'];
    $Split->recurring = $data['recurring'];
    $Split->amount = $data['amount'];

    return $Split->save();
  }
  
  public function deleteSplit(int $split_id = null) : array|bool
  {
    if(isset($split_id))
    {
      $Split = new self;

      if($Split->loadWhere('split_id = ?',[$split_id]))
      {
        $Split->status = Constants::DELETE;

        return $Split->save();
      }
    }

    return false;
  }
}