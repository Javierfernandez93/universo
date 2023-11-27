<?php

namespace Site;

use HCStudio\Orm;

class MembershipPerUser extends Orm {
	protected $tblName = 'membership_per_user';

	public function __construct() {
		parent::__construct();
	}
	
	public static function add(array $data = null) 
	{
		if(!isset($data))
		{
			return false;
		}
		
		$catalog_membership_id = (new CatalogMembership)->getCatalogMembershipId($data['package_id']);
		
		
		if(!isset($catalog_membership_id))
		{
			return false;
		}

		$MembershipPerUser = new self;
		
		if($MembershipPerUser->loadWhere("user_login_id = ? AND catalog_membership_id = ?",[$data['user_login_id'],$catalog_membership_id]))
		{
			return false;
		}
		d($catalog_membership_id);
		$MembershipPerUser->user_login_id = $data['user_login_id'];
		$MembershipPerUser->catalog_membership_id = $catalog_membership_id;
		$MembershipPerUser->create_date = time();
		
		return $MembershipPerUser->save();
	}

	public function getCurrentMembership(int $user_login_id = null) 
	{
		if(!isset($user_login_id))
		{
			return false;
		}

		if($membership = $this->connection()->row("
			SELECT 
				{$this->tblName}.{$this->tblName}_id,
				{$this->tblName}.amount,
				{$this->tblName}.amount_extra,
				catalog_membership.target,
				catalog_membership.title
			FROM
				{$this->tblName}
			LEFT JOIN 
				catalog_membership
			ON 
				catalog_membership.catalog_membership_id = {$this->tblName}.catalog_membership_id
			WHERE 
				{$this->tblName}.user_login_id = '{$user_login_id}'
			AND 
				{$this->tblName}.status = '1'
		"))
		{
			return $membership;
		}

		return false;
	}
}