<?php

namespace Site;

use HCStudio\Orm;

use Site\PermissionGroupItem;

class PermissionGroup extends Orm {
	protected $tblName = 'permission_group';
	public function __construct() {
		parent::__construct();
	}

	public static function getAll(string $code = null) 
	{
        if(!$code)
		{
			return false;
		}

		$PermissionGroup = new self;
		$permission_group = $PermissionGroup->findRow('code = ? AND status = 1', $code); 

		if(!$permission_group)
		{
			return false;
		}

		$permission_group['permissions'] = (new PermissionGroupItem)->getAll($permission_group['permission_group_id']);
		
		return $permission_group;
	}
}