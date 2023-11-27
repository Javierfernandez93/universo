<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class UserBridgeAccount extends Orm {
  protected $tblName  = 'user_bridge_account';

  const PENDING = 0;
  const ACTIVE = 1;
  const DELETE = -1;
  
  const CUSTODY_MAM = 5;
  const CPA = 5;
  const CONNECTION_FEE = 5;
  const FUND_FEES = 16;

  public function __construct() {
    parent::__construct();
  }
  
  public static function updateBasicInfo(array $data = null) : bool
  {
    $UserBridgeAccount = new self;

    if($UserBridgeAccount->loadWhere("user_bridge_account_id = ?",$data['user_bridge_account_id']))
    {
      $UserBridgeAccount->catalog_mam_account_id = $data['catalog_mam_account_id'];
      $UserBridgeAccount->account = $data['account'];
      
      return $UserBridgeAccount->save();
    }

    return false;
  }

  public static function setAs(array $data = null) : bool
  {
    $UserBridgeAccount = new self;

    if($UserBridgeAccount->loadWhere("user_bridge_account_id = ?",$data['user_bridge_account_id']))
    {
      $UserBridgeAccount->status = $data['status'];
      
      return $UserBridgeAccount->save();
    }

    return false;
  }

  public static function attachAccount(array $data = null) : bool
  {
    $UserBridgeAccount = new self;

    if($UserBridgeAccount->loadWhere("user_bridge_account_id = ?",$data['user_bridge_account_id']))
    {
      $UserBridgeAccount->status = self::ACTIVE;
      $UserBridgeAccount->account = $data['account'];
      
      return $UserBridgeAccount->save();
    }

    return false;
  }

  public static function setAccount(int $user_bridge_account_id = null,string $account = null) : bool
  {
    $UserBridgeAccount = new self;

    if($UserBridgeAccount->loadWhere("user_bridge_account_id = ?",$user_bridge_account_id))
    {
      $UserBridgeAccount->status = self::ACTIVE;
      $UserBridgeAccount->account = $account;
      
      return $UserBridgeAccount->save();
    }

    return false;
  }

  public static function updateBalance(int $user_bridge_account_id = null,float $balance = null) : bool
  {
    $UserBridgeAccount = new self;

    if($UserBridgeAccount->loadWhere("user_bridge_account_id = ?",$user_bridge_account_id))
    {
      $UserBridgeAccount->balance = $balance;
      
      return $UserBridgeAccount->save();
    }

    return false;
  }

  public static function add(array $data = null) : int|bool
  {
    $UserBridgeAccount = new self;
    $UserBridgeAccount->catalog_broker_id = $data['catalog_broker_id'] ?? 0;
    $UserBridgeAccount->user_login_id = $data['user_login_id'];
    $UserBridgeAccount->catalog_mam_account_id = $data['catalog_mam_account_id'] ?? 0;
    $UserBridgeAccount->catalog_broker_id = $data['catalog_broker_id'] ?? 0;
    $UserBridgeAccount->account = $data['account'] ?? 0;
    $UserBridgeAccount->first_name = $data['first_name'] ?? '';
    $UserBridgeAccount->last_name = $data['last_name'] ?? '';
    $UserBridgeAccount->email = $data['_email'] ?? ''; 
    $UserBridgeAccount->password = $data['_password'] ?? '';
    $UserBridgeAccount->address = $data['address'] ?? '';
    $UserBridgeAccount->country = $data['country'] ?? '';
    $UserBridgeAccount->phone_number = $data['phone_number'] ?? '';

    $UserBridgeAccount->workatfinancial = $data['workatfinancial'] ?? 0;
    $UserBridgeAccount->knowcfd = $data['knowcfd'] ?? 1;
    $UserBridgeAccount->financiallevel = $data['financiallevel'] ?? 'I Hold A Professional Qualification In Finance/Economics';
    $UserBridgeAccount->politicallyexposed = $data['politicallyexposed'] ?? 'No';
    $UserBridgeAccount->fully_aware_trading_not_sut = $data['fully_aware_trading_not_sut'] ?? 'Yes';
    $UserBridgeAccount->fully_aware_underlying_assets = $data['fully_aware_underlying_assets'] ?? 'Yes';
    $UserBridgeAccount->fully_aware_trading_leveraged = $data['fully_aware_trading_leveraged'] ?? 'Yes';
    $UserBridgeAccount->birthdate = $data['birthdate'] ?? '';
    $UserBridgeAccount->nationality = $data['nationality'] ?? '';
    $UserBridgeAccount->city = $data['city'] ?? '';
    $UserBridgeAccount->postcode = $data['postcode'] ?? '';
    $UserBridgeAccount->businessactivities = $data['businessactivities'] ?? '';
    $UserBridgeAccount->annualincome = $data['annualincome'] ?? '';
    $UserBridgeAccount->networth = $data['networth'] ?? '';
    
    $UserBridgeAccount->rent = isset($data['rent']) && $data['rent'] == true ? 1 : 0;
    $UserBridgeAccount->investmentsdeposits = isset($data['investmentsdeposits']) && $data['investmentsdeposits'] == true ? 1 : 0;
    $UserBridgeAccount->pension = isset($data['pension']) && $data['pension'] == true ? 1 : 0;
    $UserBridgeAccount->employment = isset($data['employment']) && $data['employment'] == true ? 1 : 0;
    $UserBridgeAccount->other = isset($data['other']) && $data['other'] == true ? 1 : 0;

    $UserBridgeAccount->status = $data['status'] ?? 1;
    $UserBridgeAccount->create_date = time();
    
    // d($UserBridgeAccount);
    
    return $UserBridgeAccount->save() ? $UserBridgeAccount->getId() : false;
  }

  public function get(int $user_login_id = null,int $catalog_broker_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      $filter = isset($catalog_broker_id) ? "AND {$this->tblName}.catalog_broker_id = '{$catalog_broker_id}'" : "";

      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.catalog_mam_account_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.first_name,
                {$this->tblName}.last_name,
                {$this->tblName}.email,
                {$this->tblName}.balance,
                {$this->tblName}.account,
                {$this->tblName}.password,
                {$this->tblName}.address,
                {$this->tblName}.country,
                {$this->tblName}.phone_number,
                {$this->tblName}.status
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
                {$filter}
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
  
  public function getAllFromUser(int $user_login_id = null,int $catalog_broker_id = null) : array|bool
  {
    if(isset($user_login_id) === true)
    {
      $filter = isset($catalog_broker_id) ? "AND {$this->tblName}.catalog_broker_id = '{$catalog_broker_id}'" : "";

      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.catalog_mam_account_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.first_name,
                {$this->tblName}.last_name,
                {$this->tblName}.email,
                {$this->tblName}.balance,
                {$this->tblName}.account,
                {$this->tblName}.password,
                {$this->tblName}.address,
                {$this->tblName}.country,
                {$this->tblName}.phone_number,
                {$this->tblName}.status,
                catalog_broker.broker,
                catalog_mam_account.type
              FROM
                {$this->tblName}
              LEFT JOIN 
                catalog_mam_account
              ON 
                catalog_mam_account.catalog_mam_account_id = {$this->tblName}.catalog_mam_account_id
              LEFT JOIN 
                catalog_broker
              ON 
                catalog_broker.catalog_broker_id = {$this->tblName}.catalog_broker_id
              WHERE
                {$this->tblName}.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.status != '".self::DELETE."'
                {$filter}
              GROUP BY {$this->tblName}.{$this->tblName}_id
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }

  public function getAll() : array|bool
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.user_login_id,
              {$this->tblName}.first_name,
              {$this->tblName}.last_name,
              {$this->tblName}.email,
              {$this->tblName}.balance,
              {$this->tblName}.account,
              {$this->tblName}.password,
              {$this->tblName}.address,
              {$this->tblName}.country,
              {$this->tblName}.phone_number
            FROM
              {$this->tblName}
            WHERE
              {$this->tblName}.status = '".Constants::AVIABLE."'
            ";

    return $this->connection()->rows($sql);
  }

  public function getAllPending() : array|bool
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.user_login_id,
              {$this->tblName}.first_name,
              {$this->tblName}.last_name,
              {$this->tblName}.email,
              {$this->tblName}.balance,
              {$this->tblName}.account,
              {$this->tblName}.password,
              {$this->tblName}.address,
              {$this->tblName}.country,
              {$this->tblName}.phone_number
            FROM
              {$this->tblName}
            WHERE
              {$this->tblName}.status = '".self::PENDING."'
            ";

    return $this->connection()->rows($sql);
  }
  
  public function getFirstPending() : array|bool
  {
    $sql = "SELECT 
              {$this->tblName}.{$this->tblName}_id,
              {$this->tblName}.user_login_id,
              {$this->tblName}.first_name,
              {$this->tblName}.last_name,
              {$this->tblName}.email,
              {$this->tblName}.balance,
              {$this->tblName}.account,
              {$this->tblName}.password,
              {$this->tblName}.address,
              {$this->tblName}.country,
              {$this->tblName}.workatfinancial,
              {$this->tblName}.knowcfd,
              {$this->tblName}.financiallevel,
              {$this->tblName}.politicallyexposed,
              {$this->tblName}.fully_aware_trading_not_sut,
              {$this->tblName}.fully_aware_underlying_assets,
              {$this->tblName}.fully_aware_trading_leveraged,
              {$this->tblName}.phone_number
            FROM
              {$this->tblName}
            WHERE
              {$this->tblName}.status = '".self::PENDING."'
            ORDER BY 
              {$this->tblName}.create_date
            DESC 
            LIMIT 1
            ";

    return $this->connection()->row($sql);
  }
  
  public function getPending(int $user_bridge_account_id = null) : array|bool
  {
    if(isset($user_bridge_account_id))
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.user_login_id,
                {$this->tblName}.first_name,
                {$this->tblName}.last_name,
                {$this->tblName}.email,
                {$this->tblName}.balance,
                {$this->tblName}.account,
                {$this->tblName}.password,
                {$this->tblName}.address,
                {$this->tblName}.country,
                {$this->tblName}.workatfinancial,
                {$this->tblName}.knowcfd,
                {$this->tblName}.financiallevel,
                {$this->tblName}.politicallyexposed,
                {$this->tblName}.fully_aware_trading_not_sut,
                {$this->tblName}.fully_aware_underlying_assets,
                {$this->tblName}.fully_aware_trading_leveraged,
                {$this->tblName}.phone_number
              FROM
                {$this->tblName}
              WHERE
                {$this->tblName}.status = '".self::PENDING."'
              AND 
                {$this->tblName}.user_bridge_account_id = '{$user_bridge_account_id}'
              ORDER BY 
                {$this->tblName}.create_date
              DESC 
              LIMIT 1
              ";
  
      return $this->connection()->row($sql);
    }

    return false;
  }

  public function getAllSum(array $data = null) : float
  {
    if (isset($data) === true) 
    {
      $filter = $data['start'] ? " AND gain_per_client.create_date BETWEEN '".strtotime($data['start'])."' AND '".strtotime($data['end'])."'" :"";
      
      $sql = "SELECT 
                SUM(gain_per_client.profit) as profits
              FROM 
                {$this->tblName} 
              LEFT JOIN 
                gain_per_client
              ON 
                gain_per_client.user_bridge_account_id = {$this->tblName}.user_bridge_account_id
              WHERE
                {$this->tblName}.user_login_id = '{$data['user_login_id']}'
              AND 
                {$this->tblName}.status = '".Constants::AVIABLE."'
                {$filter}
              ";

      if($profits = $this->connection()->field($sql))
      {
        return $profits;
      }
    }

    return 0;
  }

  public function getIdByAccount(int $account = null) : bool|int
  {
    if (isset($account) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE
                {$this->tblName}.account = '{$account}'
              AND 
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql); 
    }

    return false;
  }

  public function exist(string $phone_number = null) : bool
  {
    if (isset($phone_number) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE
                {$this->tblName}.phone_number = '{$phone_number}'
              AND 
                {$this->tblName}.status != '".Constants::DELETE."'
              ";

      return $this->connection()->field($sql) ? true : false; 
    }

    return false;
  }
  
  public function getUserIdById(int $user_bridge_account_id = null) : bool|int
  {
    if (isset($user_bridge_account_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.user_login_id
              FROM 
                {$this->tblName}
              WHERE
                {$this->tblName}.user_bridge_account_id = '{$user_bridge_account_id}'
              AND 
                {$this->tblName}.status = '".Constants::AVIABLE."'
              ";

      return $this->connection()->field($sql); 
    }

    return false;
  }

	public static function formatUsersToArray(array $network = null) 
	{
		return implode(",",array_map(function($level){
			return implode(",",$level);
		},$network));
	}

	public static function getNetworkBalance(array $network = null) 
	{
    $user_login_id_in = self::formatUsersToArray($network);

		return (new self)->getSumIn($user_login_id_in);
	}

	public function getSumIn(string $user_login_id_in = null) : float
	{
		if(isset($user_login_id_in) === true)
		{
			$sql = "SELECT 
						SUM({$this->tblName}.balance) as balance
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.user_login_id IN({$user_login_id_in})
					AND
						{$this->tblName}.status IN (".self::ACTIVE.")
					";

			if($balance = $this->connection()->field($sql))
			{
				return $balance;
			}
		}

		return 0;
	}
}