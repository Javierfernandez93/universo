<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Util;

use Site\UserBridgeAccount;

class BuyPerBridge extends Orm {
  protected $tblName  = 'buy_per_bridge';

  const PENDING = 0;
  const PAID = 1;
  const PROCESSING = 2;
  const BRIDGE_PAID = 3;
  
  const MAIL_WAITING_FOR_SEND = 0;
  const MAIL_SENT = 1;

  // const BRIDGE_WALLET = 'TDofR3jiLQWF6sr3qNSkQtuGbbr8dKYWyZ';
  const BRIDGE_WALLET = 'TAr7YFFgxkRs2zEHGm34dcj8M4TqAv2eGP';
  
  const PREFIX_MAM = 'mam-';
  const PREFIX_FUND = 'fund-';

  public function __construct() {
    parent::__construct();
  }
  
  public static function getSanitizedId(string $buy_per_bridge_id = null) 
  {
    return explode('-',$buy_per_bridge_id)[1];
  }

  public static function isBuyPerBridgePayoutId(string $buy_per_bridge_id = null) : bool
  {
    return str_contains($buy_per_bridge_id,self::PREFIX_MAM) || str_contains($buy_per_bridge_id,self::PREFIX_FUND);
  }

  public static function isBuyPerPayoutId(string $buy_per_bridge_id = null) : bool
  {
    return str_contains($buy_per_bridge_id,self::PREFIX_FUND);
  }

  public static function getPayoutId(array $data = null) : string 
  {
    if($data['catalog_bridge_buy_type_id'] == CatalogBridgeBuyType::MAM)
    {
      return self::PREFIX_MAM.$data['buy_per_bridge_id'];
    } else if($data['catalog_bridge_buy_type_id'] == CatalogBridgeBuyType::BRIDGE_FUNDS) {
      return self::PREFIX_FUND.$data['buy_per_bridge_id'];
    }

    return "";
  }

  public static function getPartialFunds(array $data = null) : float 
  {
    if($data['catalog_bridge_buy_type_id'] == CatalogBridgeBuyType::MAM)
    {
      return Util::getPercentaje($data['amount'],UserBridgeAccount::CPA,true);
      // return Util::getPercentaje($data['amount'],UserBridgeAccount::CUSTODY_MAM+UserBridgeAccount::CPA,true);
    } else if($data['catalog_bridge_buy_type_id'] == CatalogBridgeBuyType::BRIDGE_FUNDS) {
      return Util::getPercentaje($data['amount'],UserBridgeAccount::FUND_FEES,true);
    }

    return 0;
  }

  public static function setAsMailSent(int $buy_per_bridge_id = null) : bool
  {
    $BuyPerBridge = new self;
    
    if($BuyPerBridge->loadWhere('buy_per_bridge_id = ?',$buy_per_bridge_id))
    {
      $BuyPerBridge->mail_send = self::MAIL_SENT;

      return $BuyPerBridge->save();
    }
    
    return false;
  }

  public static function setAsProcessing(int $buy_per_bridge_id = null) : bool
  {
    $BuyPerBridge = new self;
    
    if($BuyPerBridge->loadWhere('buy_per_bridge_id = ?',$buy_per_bridge_id))
    {
      $BuyPerBridge->request_payout_date = time();
      $BuyPerBridge->status = self::PROCESSING;

      return $BuyPerBridge->save();
    }
    
    return false;
  }

  public static function setAsBridgePaid(array $data = null) : bool
  {
    $BuyPerBridge = new self;
    
    if($BuyPerBridge->loadWhere('buy_per_bridge_id = ?',$data['buy_per_bridge_id']))
    {
      $BuyPerBridge->tx_id = $data['tx_id'];
      $BuyPerBridge->bridge_pay_date = time();
      $BuyPerBridge->status = self::BRIDGE_PAID;

      return $BuyPerBridge->save();
    }
    
    return false;
  }

  public static function setAsPaid(int $buy_per_user_id = null) : bool
  {
    $BuyPerBridge = new self;
    
    if($BuyPerBridge->loadWhere('buy_per_user_id = ?',$buy_per_user_id))
    {
      $BuyPerBridge->status = self::PAID;

      return $BuyPerBridge->save();
    }
    
    return false;
  }

  public static function add(array $data = null) : bool
  {
    $BuyPerBridge = new self;
    $BuyPerBridge->buy_per_user_id = $data['buy_per_user_id'];
    $BuyPerBridge->user_bridge_account_id = $data['user_bridge_account_id'];
    $BuyPerBridge->catalog_bridge_buy_type_id = $data['catalog_bridge_buy_type_id'];
    $BuyPerBridge->create_date = time();
  
    return $BuyPerBridge->save();
  }

  public function getAll(int $status = null) : array|bool
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.buy_per_user_id,
              {$this->tblName}.user_bridge_account_id,
              {$this->tblName}.mail_send,
              {$this->tblName}.tx_id,
              {$this->tblName}.status,
              catalog_bridge_buy_type.catalog_bridge_buy_type_id,
              catalog_bridge_buy_type.type,
              {$this->tblName}.create_date,
              user_data.names as user_names,
              buy_per_user.amount,
              catalog_mam_account.type as mam_type,
              CONCAT_WS(' ',user_bridge_account.first_name,user_bridge_account.last_name) as names,
              user_bridge_account.user_login_id,
              user_bridge_account.email,
              user_bridge_account.account
            FROM
              {$this->tblName}
            LEFT JOIN
              buy_per_user 
            ON  
              buy_per_user.buy_per_user_id = {$this->tblName}.buy_per_user_id 
            LEFT JOIN
              catalog_bridge_buy_type 
            ON  
              catalog_bridge_buy_type.catalog_bridge_buy_type_id = {$this->tblName}.catalog_bridge_buy_type_id 
            LEFT JOIN
              user_bridge_account 
            ON  
              user_bridge_account.user_bridge_account_id = {$this->tblName}.user_bridge_account_id 
            
            LEFT JOIN
              catalog_mam_account 
            ON  
              catalog_mam_account.catalog_mam_account_id = user_bridge_account.catalog_mam_account_id 
            LEFT JOIN
              user_data 
            ON  
              user_data.user_data_id = user_bridge_account.user_login_id 
            WHERE
              {$this->tblName}.status = '{$status}'
            ";

    return $this->connection()->rows($sql);
  }
  
  public function isAviableToSendMoneyToBridge(int $buy_per_bridge_id = null) : bool
  {
    if(isset($buy_per_bridge_id))
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.buy_per_bridge_id = '{$buy_per_bridge_id}'
              AND 
                {$this->tblName}.status = '".self::PAID."'
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function getAllForMailSend() : array|bool
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.tx_id,
              user_bridge_account.account,
              catalog_mam_account.type,
              user_bridge_account.first_name,
              user_bridge_account.last_name,
              user_bridge_account.email
            FROM
              {$this->tblName}
            LEFT JOIN 
              user_bridge_account
            ON 
              user_bridge_account.user_bridge_account_id = {$this->tblName}.user_bridge_account_id
            LEFT JOIN 
              catalog_mam_account
            ON 
              catalog_mam_account.catalog_mam_account_id = user_bridge_account.catalog_mam_account_id
            WHERE
              {$this->tblName}.mail_send = '".self::MAIL_WAITING_FOR_SEND."'
            AND 
              {$this->tblName}.status = '".self::BRIDGE_PAID."'
            ";

    return $this->connection()->rows($sql);
  }
}