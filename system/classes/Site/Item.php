<?php

namespace Site;

use HCStudio\Orm;
use JFStudio\Constants;

use Site\ShortUrl;

class Item extends Orm {
  protected $tblName  = 'item';
  const URL_BASE_PLUGIN = 'https://www.capitalpayments.me/apps/paymentGateway/';

  public function __construct() {
    parent::__construct();
  }

  public static function load(int $buy_per_user_login_id = null) 
  {
    if(isset($buy_per_user_login_id) === true) 
    {
      $PaymentGateway = new PaymentGateway;
      
      if($PaymentGateway->loadWhere('buy_per_user_login_id = ?',$buy_per_user_login_id))
      {
        $TronWallet = new TronWallet;
        
        if($wallet = $TronWallet->getWallet($PaymentGateway->tron_wallet_id))
        {
          return $wallet;
        }
      }
    }
  }

  public static function getURLBaseForItemPlugin(array $data = null) : string
  {
    return self::URL_BASE_PLUGIN.'?'.http_build_query($data);
  }

  public static function addShort(array $data = null) : array
  {
    return ShortUrl::addShort([
      'title' => $data['title'],
      'user_login_id' => $data['user_login_id'],
      'url' => self::getURLBaseForItemPlugin($data['url_data'])
    ]);
  }

  public static function add(array $data = null) : bool|int
  {
    $Item = new self;

    $Item->user_api_id = $data['user_api_id'];
    $Item->title = $data['title'];
    $Item->description = $data['description'];
    $Item->price = $data['price'];
    $Item->recomend = filter_var($data['recomend'] ?? true,FILTER_VALIDATE_BOOLEAN) ? 1 : 0;
    $Item->image = $data['image'] ?? '';
    $Item->create_date = time();

    if($Item->save())
    {
      if($data['url_data'])
      {
        $data['url_data']['item_id'] = $Item->getId();

        if($short = self::addShort($data))
        {
          $Item->short_url_id = $short['short_url_id'];
        }
      }
    }

    return $Item->save();
  }

  public static function edit(array $data = null) : bool|int
  {
    $Item = new self;

    if($Item->loadWhere('user_api_id = ? AND item_id = ?',[$data['user_api_id'],$data['item_id']]))
    {
      $Item->user_api_id = $data['user_api_id'];
      $Item->title = $data['title'];
      $Item->description = $data['description'];
      $Item->price = $data['price'];
      $Item->image = $data['image'];
      $Item->create_date = time();
      
      return $Item->save();
    }

    return false;
  }

  public function getAllItems(int $user_api_id = null) 
  {
    if(isset($user_api_id) == true)
    {
        $sql = "SELECT 
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.title,
                  {$this->tblName}.description,
                  {$this->tblName}.recomend,
                  {$this->tblName}.image,
                  {$this->tblName}.status,
                  {$this->tblName}.price
                FROM 
                  {$this->tblName}
                WHERE
                  {$this->tblName}.user_api_id = '{$user_api_id}'
                AND 
                  {$this->tblName}.status IN (".Constants::AVIABLE.")
                ";
    
        return $this->connection()->rows($sql);
    }
  }

  public function getItem(int $user_api_id = null,int $item_id = null) 
  {
    if(isset($user_api_id,$item_id) == true)
    {
        $sql = "SELECT 
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.title,
                  {$this->tblName}.description,
                  {$this->tblName}.recomend,
                  {$this->tblName}.image,
                  {$this->tblName}.status,
                  {$this->tblName}.price
                FROM 
                  {$this->tblName}
                WHERE
                  {$this->tblName}.user_api_id = '{$user_api_id}'
                AND 
                  {$this->tblName}.item_id = '{$item_id}'
                AND 
                  {$this->tblName}.status IN (".Constants::AVIABLE.")
                ";
    
        return $this->connection()->row($sql);
    }
  }
  
  public function getAllItemsForAdmin(int $user_api_id = null) : array|bool
  {
    if(isset($user_api_id) == true)
    {
        if($items = $this->_getAllItemsForAdmin($user_api_id))
        {
          $ShortUrl = new ShortUrl;

          return array_map(function($item) use($ShortUrl) {
            $item['short_url'] = $ShortUrl->get($item['short_url_id']);

            return $item;
          },$items);
        }
    }

    return false;
  }

  public function _getAllItemsForAdmin(int $user_api_id = null) 
  {
    if(isset($user_api_id) == true)
    {
        $sql = "SELECT 
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.title,
                  {$this->tblName}.description,
                  {$this->tblName}.short_url_id,
                  {$this->tblName}.recomend,
                  {$this->tblName}.image,
                  {$this->tblName}.status,
                  {$this->tblName}.price
                FROM 
                  {$this->tblName}
                WHERE
                  {$this->tblName}.user_api_id = '{$user_api_id}'
                AND 
                  {$this->tblName}.status != '".Constants::DELETE."'
                ";
    
        return $this->connection()->rows($sql);
    }
  }

  public static function setAs(int $item_id = null,int $user_api_id = null,int $status = null) : bool
  {
    if(isset($item_id,$user_api_id) == true)
    {
      $Item = new self;
      
      if($Item->loadWhere('item_id = ? AND user_api_id = ?',[$item_id,$user_api_id]))
      {
        $Item->status = $status;
        
        return $Item->save();
      }
    }

    return false;
  }

  public function deleteItem(string $item_id = null,int $user_api_id = null) : bool
  {
    if(isset($item_id,$user_api_id) == true)
    {
      $Item = new self;
      
      if($Item->loadWhere('item_id = ? AND user_api_id = ?',[$item_id,$user_api_id]))
      {
        $Item->status = Constants::DELETE;
        
        return $Item->save();
      }
    }

    return false;
  }
}