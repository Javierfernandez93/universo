<?php

namespace Site;

use HCStudio\Orm;
use Constants;

class UserReferral extends Orm {
  protected $tblName  = 'user_referral';

  const WAITING_FOR_PAYMENT = 0;
  const ACTIVE = 1;
  const DEFAULT_COMMISSION = 30;
  
  public function __construct() {
    parent::__construct();
  }
  
  public static function appendReferral(array $data = null) 
  {
    $UserReferral = new self;
    
    if($UserReferral->loadWhere("user_login_id = ? AND status = ?",[$data['user_login_id'],1]))
    {
      return false;
    }
    
    $UserReferral->loadWhere("user_login_id = ? AND status = ?",[$data['user_login_id'],0]);

    $UserReferral->user_login_id = $data['user_login_id'];
    $UserReferral->referral_id = $data['referral_id'];
    $UserReferral->side = $data['side'];
    $UserReferral->create_date = time();
    $UserReferral->status = 1;
    
    return $UserReferral->save();
  }

  public static function updateReferral(int $user_login_id = null,int $referral_id = 0) 
  {
    if(isset($user_login_id,$referral_id) === true)
    {
      $UserReferral = new UserReferral;
      
      if($UserReferral->loadWhere('user_login_id = ?', $user_login_id))
      {
        $UserReferral->referral_id = $referral_id;

        return $UserReferral->save();
      }
    }

    return false;
  }

  public static function addCommission(int $user_login_id = null,float $commission = 0) 
  {
    if(isset($user_login_id) === true)
    {
      $UserReferral = new UserReferral;
      
      if($UserReferral->loadWhere('user_login_id = ?', $user_login_id))
      {
        $UserReferral->commission = $commission;

        return $UserReferral->save();
      }
    }

    return false;
  }
  
  public function getLastReferrals(int $referral_id = null) 
  {
    return $this->getReferrals($referral_id," ORDER BY {$this->tblName}.create_date DESC LIMIT 5 ");
  }

  public function getReferralCount(int $referral_id = null,string $filter = '') 
  {
    if(isset($referral_id) === true) 
    {
      $sql = "SELECT 
                COUNT({$this->tblName}.user_login_id) as c
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.referral_id = '{$referral_id}' 
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
                {$filter}
              ";
              
      return $this->connection()->field($sql);
    }
  }
  
  public function getReferralId(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.referral_id
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}' 
              AND 
                {$this->tblName}.status IN (".Constants::AVIABLE.",".self::WAITING_FOR_PAYMENT.")
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }

  public function getNextPosition(int $referral_id = null) 
  {
    return $this->getLastPosition($referral_id) + 1;
  }

  public function getLastPosition(int $referral_id = null) : int 
  {
    if(isset($referral_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.position
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.referral_id = '{$referral_id}' 
              AND 
                {$this->tblName}.status IN (".Constants::AVIABLE.")
              ORDER BY 
                {$this->tblName}.position
              DESC 
              LIMIT 1
              ";

      if($last_position = $this->connection()->field($sql))
      {
        return $last_position;
      }
    }

    return 0;
  }

  public function getUserReferralId(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.referral_id
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}' 
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              ";

      return $this->connection()->field($sql);
    }
  }

  public function getCommission(int $user_login_id = null) : float 
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.commission
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}' 
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              ";

      return $this->connection()->field($sql);
    }

    return 0;
  }
  
  public function getInfo(int $user_login_id = null)  
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.referral_id,
                {$this->tblName}.commission
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}' 
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }

  public function getReferrals(int $referral_id = null,string $filter = '') 
  {
    if(isset($referral_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id,
                user_data.names,
                user_address.country_id,
                user_account.image,
                user_login.signup_date,
                user_login.company_id,
                user_login.email,
                user_contact.phone
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                user_data
              ON 
                user_data.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_account
              ON 
                user_account.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_login
              ON 
                user_login.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_address
              ON 
                user_address.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_contact
              ON 
                user_contact.user_login_id = {$this->tblName}.user_login_id
              WHERE 
                {$this->tblName}.referral_id = '{$referral_id}' 
              AND 
                {$this->tblName}.status IN (".self::WAITING_FOR_PAYMENT.",".Constants::AVIABLE.")
                {$filter}
              ";

      return $this->connection()->rows($sql);
    }
  }
  
  public function getReferralsIds(int $referral_id = null) 
  {
    if(isset($referral_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id
              FROM 
                {$this->tblName} 
              WHERE 
                {$this->tblName}.referral_id = '{$referral_id}' 
              AND 
                {$this->tblName}.status IN (".self::WAITING_FOR_PAYMENT.",".Constants::AVIABLE.")
              ";

      return $this->connection()->column($sql);
    }
  }

  public function getLastMembers(int $sponsor_id = null) 
  {
    if(isset($sponsor_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id,
                user_account.image,
                user_data.names
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                user_data 
              ON 
                user_data.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_account 
              ON 
              user_account.user_login_id = {$this->tblName}.user_login_id
              WHERE 
                {$this->tblName}.sponsor_id = '{$sponsor_id}' 
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->rows($sql);
    }
  }
  
  public function getReferral(int $user_login_id = null) 
  {
    if(isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                user_login.user_login_id,
                user_data.names,
                user_account.image,
                user_login.signup_date,
                user_login.email
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                user_data
              ON 
                user_data.user_login_id = {$this->tblName}.referral_id
              LEFT JOIN 
                user_account
              ON 
                user_account.user_login_id = {$this->tblName}.referral_id
              LEFT JOIN 
                user_login
              ON 
                user_login.user_login_id = {$this->tblName}.referral_id
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}' 
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              GROUP BY 
                {$this->tblName}.user_login_id
              ";
              
      return $this->connection()->row($sql);
    }
  }

  public static function getNetworkData(int $limit = -1 ,int $main_referral_id = null) : array|bool
  {
    if($multilevel = (new self)->getNetwork($limit,$main_referral_id))
    {
      $UserReferral = new UserReferral;
      $UserLogin = new UserLogin(false,false);
      $UserData = new UserData;
      $_multilevel = [];

      foreach($multilevel as $key => $level)
      {
        foreach($level as $_key => $user_login_id)
        {
          $referral_id = $UserReferral->getReferralId($user_login_id);
          
          $_multilevel[$key]['users'][$_key] = [
            'referral' => [
              'referral_id' => $referral_id,
              'names' => $UserData->getNames($referral_id)
            ],
            'signup_date' => $UserLogin->getSignupDate($user_login_id),
            'user_login_id' => $user_login_id,
            'names' => $UserData->getNames($user_login_id),
          ];
        }
      }

      return $_multilevel;
    }

    return false;
  }

  public function getNetwork(int $limit = -1 ,string $referral_id = null,int $count = 0) 
  {
    $result = [];
        
    $sql = "SELECT user_login_id FROM user_referral WHERE referral_id IN ({$referral_id})";      

    if (($count != $limit) && ($data = $this->connection()->column($sql))) {
      $count++;
      $join = join(",", $data);
      $result = $this->getNetwork($limit, $join, $count);
      $result = array_merge(array($data), $result);
    }

    return $result;
  }
  
  public function simplyfyNetwork(array $network = null) : array {
    $data = [];

    foreach($network as $level)
    {
      foreach($level as $user_login_id)
      {
        $data[] = $user_login_id;
      }
    }

    return $data;
  } 
  
  public function getSponsorByReverseLevel(int $limit = -1 ,string $user_login_id = null,int $count = 0) : array
  {
		if($network = $this->getNetworkReverse($limit,$user_login_id))
    {
      return self::simplyfyNetwork($network);
    }

    return [];
  }

  public function getNetworkReverse(int $limit = -1 ,string $user_login_id = null,int $count = 0) 
  {
    $result = [];
 
    $sql = "SELECT referral_id FROM user_referral WHERE user_login_id IN ({$user_login_id})";      

    if (($count != $limit) && ($data = $this->connection()->column($sql))) {
      $count++;
      $join = join(",", $data);
      $result = $this->getNetworkReverse($limit, $join, $count);
      $result = array_merge(array($data), $result);
    }

    return $result;
  }

  public function getLastMembersCountries(int $sponsor_id = null) 
  {
    if(isset($sponsor_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id,
                user_address.country_id
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                user_address 
              ON 
                user_address.user_login_id = {$this->tblName}.user_login_id
              LEFT JOIN 
                user_account 
              ON 
              user_account.user_login_id = {$this->tblName}.user_login_id
              WHERE 
                {$this->tblName}.sponsor_id = '{$sponsor_id}' 
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->rows($sql);
    }
  }

  public static function updateReferralId(int $user_login_id = null,int $referral_id = null)
  {
    $UserReferral = new self;
    
    $UserReferral->loadWhere('user_login_id = ?', $user_login_id);
    
    if(!$UserReferral->getId())
    {
      return false;
    }

    $UserReferral->referral_id  = $referral_id;

    return $UserReferral->save();
  }

  public function getCountUsersByIn(string $referral_ids = null,int $catalog_user_type_id = null) : int
  {
    if(!$referral_ids)
    {
      return false;
    }
    
    return $this->connection()->field("
      SELECT 
        COUNT({$this->tblName}.user_login_id) as c
      FROM 
        {$this->tblName} 
      LEFT JOIN  
        user_login 
      ON 
        user_login.user_login_id = {$this->tblName}.user_login_id
      WHERE 
        {$this->tblName}.referral_id IN ({$referral_ids})
      AND 
        {$this->tblName}.status != '".Constants::DELETE."'
      AND 
        user_login.catalog_user_type_id = '{$catalog_user_type_id}'
      "); 
  }

  public function getSellersFromSupportId(int $user_support_id = null) 
  {
    if(!$user_support_id) {
      return false;
    }
    
    return $this->connection()->column("
      SELECT 
        {$this->tblName}.user_login_id
      FROM 
        {$this->tblName} 
      WHERE 
        {$this->tblName}.user_support_id = '{$user_support_id}'
      "); 
  }
}