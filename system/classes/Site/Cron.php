<?php

namespace Site;

use HCStudio\Orm;

class Cron extends Orm {
	protected $tblName = 'cron';
	public function __construct() {
		parent::__construct();
	}

	public function isCronAviable(string $name = null) : bool
	{
        if(isset($name) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.name = '{$name}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            
            return $this->connection()->field($sql) ? true : false;
        }

        return false;
	}
	
	public function getCronIdByName(string $name = null) : bool|int
	{
        if(isset($name) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.name = '{$name}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
	}

	public function getAll()
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.name,
					{$this->tblName}.status,
					{$this->tblName}.description
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status != '-1'
				";
		
		return $this->connection()->rows($sql);
	}
}