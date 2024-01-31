<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class CatalogPaymentMethod extends Orm {
	protected $tblName = 'catalog_payment_method';

	const COINPAYMENTS = 1;
	const STRIPE = 2;
	const EWALLET = 3;
	const PAYPAL = 4;
	const AIRTM = 5;
	const CAPITALPAYMENTS = 6;
	const PAYMENT_GATEWAY = 7;

	public function __construct() {
		parent::__construct();
	}

	public function getAll()
	{
		$catalog_payment_methods = (new self)->findAll("status = ?",1);

		if(!$catalog_payment_methods)
		{
			return false;
		}

		return array_map(function($catalog_payment_method){
			$catalog_payment_method['additional_data'] = json_decode($catalog_payment_method['additional_data'],true);
			return $catalog_payment_method;
		},$catalog_payment_methods);	
	}

	public function get(int $catalog_payment_method_id = null)
	{
		if(isset($catalog_payment_method_id) == true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id,
						{$this->tblName}.payment_method,
						{$this->tblName}.image
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.catalog_payment_method_id = '{$catalog_payment_method_id}'
					AND 
						{$this->tblName}.status != '".Constants::DELETE."'
					";
			
			return $this->connection()->row($sql);
		}

		return false;
	}

	public function getFee(int $catalog_payment_method_id = null) : float
	{
		if(isset($catalog_payment_method_id) == true)
		{
			$sql = "SELECT 
						{$this->tblName}.fee
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.catalog_payment_method_id = '{$catalog_payment_method_id}'
					AND 
						{$this->tblName}.status = '1'
					";
			
			return $this->connection()->field($sql);
		}

		return 0;
	}
	
	public function getFeePaymentMethod(int $catalog_payment_method_id = null) 
	{
		if(isset($catalog_payment_method_id) == true)
		{
			$sql = "SELECT 
						{$this->tblName}.payment_method
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.catalog_payment_method_id = '{$catalog_payment_method_id}'
					AND 
						{$this->tblName}.status = '1'
					";
			
			return $this->connection()->field($sql);
		}

		return 0;
	}
}