<?php

namespace Site;

use HCStudio\Orm;

class CatalogMembership extends Orm {
	protected $tblName = 'catalog_membership';

	public function __construct() {
		parent::__construct();
	}
	
	public function getCatalogMembershipId(int $package_id = null) {
		if(!isset($package_id))
		{
			return false;
		}

		return $this->connection()->field("
				SELECT
					{$this->tblName}.{$this->tblName}_id
				FROM 
					{$this->tblName}
				WHERE  
					{$this->tblName}.package_id = '{$package_id}'
		");
	}
}