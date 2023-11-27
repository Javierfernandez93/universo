<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Util;

class CatalogRange extends Orm {
	protected $tblName = 'catalog_range';
	public function __construct() {
		parent::__construct();
	}

	public function getCount()
	{
		$sql = "SELECT 
					COUNT({$this->tblName}.{$this->tblName}_id) as c
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";
		
		return $this->connection()->field($sql);
	}

	public function getAll()
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.brand,
					{$this->tblName}.create_date
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";
		
		return $this->connection()->rows($sql);
	}

	public function _getAll()
	{
		$sql = "SELECT 
					{$this->tblName}.brand
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";
		
		return $this->connection()->column($sql);
	}

	
    public function getRange(int $catalog_range_id = null) : array|bool
	{
        if(isset($catalog_range_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.title,
                        {$this->tblName}.volumen,
                        {$this->tblName}.percentage,
                        {$this->tblName}.start_volumen,
                        {$this->tblName}.end_volumen
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.catalog_range_id = '{$catalog_range_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ORDER BY 
                        {$this->tblName}.catalog_range_id
                    DESC 
                    ";
            
            return $this->connection()->row($sql);
	    }

        return false;
	}
}