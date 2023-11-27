<?php

namespace Site;

use HCStudio\Orm;

use Site\CatalogRange;

class CatalogRangePerUser extends Orm {
	protected $tblName = 'catalog_range_per_user';
	public function __construct() {
		parent::__construct();
	}

	public function getNextRange(int $user_login_id = null)
	{
		$next_catalog_range_id = 1;

		if($catalog_range_id = $this->getLastTrange($user_login_id))
        {
            $next_catalog_range_id = $catalog_range_id + 1;
        }

        return (new CatalogRange)->getRange($next_catalog_range_id);
	}

	public function getLastTrange(int $user_login_id = null) : int
	{
        if(isset($user_login_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.catalog_range_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ORDER BY 
                        {$this->tblName}.catalog_range_id
                    DESC 
                    ";
            
            return $this->connection()->field($sql);
	    }

        return 0;
	}
}