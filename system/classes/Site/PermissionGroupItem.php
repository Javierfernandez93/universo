<?php

namespace Site;

use HCStudio\Orm;

class PermissionGroupItem extends Orm {
	protected $tblName = 'permission_group_item';
	public function __construct() {
		parent::__construct();
	}

	public function getAll(int $permission_group_id = null) 
	{
		if(!$permission_group_id)
		{
			return false;
		}

		return $this->connection()->rows("
			SELECT 
				catalog_permission.catalog_permission_id,
				catalog_permission.permission,
				catalog_permission.description
			FROM 
				{$this->tblName} 
			LEFT JOIN 
				catalog_permission 
			ON 
				catalog_permission.catalog_permission_id = {$this->tblName}.catalog_permission_id
			WHERE 
				{$this->tblName}.permission_group_id = '{$permission_group_id}'
			AND 
				{$this->tblName}.status = '1'
			");
	}
}