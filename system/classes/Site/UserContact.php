<?php

namespace Site;

use HCStudio\Orm;

use Site\UserAddress;

use World\Country;

class UserContact extends Orm {
  protected $tblName  = 'user_contact';

  public function __construct() {
    parent::__construct();
  }

	public function getPhone(int $user_login_id = null)
	{
		if(isset($user_login_id) === true) 
		{
			$sql = "SELECT 
						{$this->tblName}.phone
					FROM 
						{$this->tblName} 
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
						";
						
			return $this->connection()->field($sql);
		}
	}

  public function getWhatsApp(int $user_login_id = null)
	{
		if(isset($user_login_id) === true)
		{
			if($country_id = (new UserAddress)->getCountryId($user_login_id))
			{
				if($phone_code = (new Country)->getPhoneCodeByCountryId($country_id))
				{
					$whatsapp = $phone_code.$this->getPhone($user_login_id);
					
					return preg_replace('/[^0-9]/', '', $whatsapp);
				}
			}
		}

		return false;
	}
}