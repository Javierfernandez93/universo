<?php

namespace Site;

use HCStudio\Orm;

use Constants;

use Site\Product;
use Site\BuyPerUser;

class Package extends Orm {
	protected $tblName = 'package';
	
	const PAY_BUSINESS = 1;
	const PAY_ACADEMY = 2;

	public function __construct() {
		parent::__construct();
	}

	public static function hasPackageWithSku(array $items = null,string $catalog_package_type_id = null) : bool
	{
		$hasPackage = false;

		if(isset($items))
		{
			foreach($items as $item)
			{
				if(isset($item['item']))
				{
					if($item['item']->catalog_package_type_id == $catalog_package_type_id)
					{
						$hasPackage = true;
	
						break;
					}
				} else if(is_array($item)) {
					if($item['catalog_package_type_id'] == $catalog_package_type_id)
					{
						$hasPackage = true;
	
						break;
					}
				}

			}
		}
		
		return $hasPackage;
	}


	public function getAllWithProducts(string $filter = '')
	{
		if($packages = $this->getALl($filter))
		{
			$Product = new Product; 
			
			return array_map(function($package) use($Product) {
				$package['products'] = json_decode($package['product_ids'],true);

				$package['products'] = array_map(function($product) use($Product) {
					$product['product'] = $Product->getProduct($product['product_id']);
					return $product;
				},$package['products']);	

				return $package;
			},$packages);
		}
	}

	public static function getMonthlyPackage(int $user_login_id = null)
	{
		if((new BuyPerUser)->hasPackageBuy($user_login_id,self::INITIAL_PACKAGE))
		{
			return self::MONTHLY_PACKAGE;
		} else {
			return self::INITIAL_PACKAGE;
		}
	}

	public function getAll(string $filter = '')
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.sku,
					{$this->tblName}.description,
					{$this->tblName}.full_description,
					{$this->tblName}.image,
					{$this->tblName}.title,                                                                                                                                                 
					{$this->tblName}.product_ids,
					{$this->tblName}.amount,
					{$this->tblName}.catalog_package_type_id,
					{$this->tblName}.catalog_currency_id,
					{$this->tblName}.aviable,
					{$this->tblName}.status
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '".Constants::AVIABLE."'
					{$filter}
				";
		
		return $this->connection()->rows($sql);
	}

	public static function getProducts(array $products = null) : array 
	{
		$Product = new Product; 
		return array_map(function($product) use($Product) {
			$product['product'] = $Product->getProduct($product['product_id']);
			return $product;
		},$products);	
	}

	public function getPackage(int $package_id = null)
	{
		if(isset($package_id) === true)
		{
			if($package = $this->_getPackage($package_id))
			{
				$package['products'] = json_decode($package['product_ids'],true);
				$package['products'] = self::getProducts($package['products']);

				return $package;
			}
		}

		return false;
	}
	
	public function _getPackage(int $package_id = null)
	{
		if(isset($package_id) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id,
						{$this->tblName}.title,
						{$this->tblName}.catalog_commission_ids,
						{$this->tblName}.product_ids,
						{$this->tblName}.catalog_package_type_id,
						{$this->tblName}.amount
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.status = '".Constants::AVIABLE."'
					AND 
						{$this->tblName}.package_id = '{$package_id}'
					";
			
			return $this->connection()->row($sql);
		}

		return false;
	}
}