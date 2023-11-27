<?php

namespace Site;

use HCStudio\Orm;

class CatalogBroker extends Orm {
	protected $tblName = 'catalog_broker';

	const BRIDGE = 1;
	const EXMA = 2;
	public function __construct() {
		parent::__construct();
	}

	public function getBrokerByName(string $broker = null)
	{
		if(isset($broker) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.broker = '{$broker}'
					AND 
						{$this->tblName}.status = '1'
					";
			
			return $this->connection()->field($sql);
		}

		return false;
	}
}