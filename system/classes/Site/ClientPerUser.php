<?php

namespace Site;

use HCStudio\Orm;
use JFStudio\Constants;

class ClientPerUser extends Orm {
	protected $tblName = 'client_per_user';
    
	public function __construct() {
		parent::__construct();
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
						{$this->tblName}.status IN (".Constants::AVIABLE.")
					";

			if($balance = $this->connection()->field($sql))
			{
				return $balance;
			}
		}

		return 0;
	}

	public function getSum(int $user_login_id = null) : float
	{
		if(isset($user_login_id) === true)
		{
			$sql = "SELECT 
						SUM({$this->tblName}.balance) as balance
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
					AND
						{$this->tblName}.status IN (".Constants::AVIABLE.")
					";

			return $this->connection()->field($sql);
		}

		return 0;
	}
}