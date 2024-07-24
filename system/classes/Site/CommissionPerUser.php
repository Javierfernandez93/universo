<?php

namespace Site;

use HCStudio\Orm;

use Site\CatalogCurrency;
use Site\UserReferral;
use HCStudio\Util;
use Constants;

class CommissionPerUser extends Orm
{
	protected $tblName = 'commission_per_user';

	/* status */
	const PENDING_FOR_FILE = 1;
	const PENDING_FOR_SIGNATURE = 2;
	const COMPLETED = 3;

	public function __construct()
	{
		parent::__construct();
	}

	public function getAllWithData(string $filter = '') {
		return $this->connection()->rows("SELECT 
			{$this->tblName}.{$this->tblName}_id,
			{$this->tblName}.user_login_id,
			{$this->tblName}.buy_per_user_id,
			{$this->tblName}.package_id,
			{$this->tblName}.catalog_currency_id,
			{$this->tblName}.deposit_date,
			{$this->tblName}.transaction_per_wallet_id,
			{$this->tblName}.user_login_id_from,
			{$this->tblName}.catalog_commission_id,
			{$this->tblName}.create_date,
			{$this->tblName}.signature,
			{$this->tblName}.file,
			catalog_currency.currency,
			catalog_commission.name,
			user_support.names,
			{$this->tblName}.status,
			{$this->tblName}.amount
		FROM 
			{$this->tblName}
		LEFT JOIN
			catalog_currency 
		ON 
			catalog_currency.catalog_currency_id = {$this->tblName}.catalog_currency_id 
		LEFT JOIN
			catalog_commission 
		ON 
			catalog_commission.catalog_commission_id = {$this->tblName}.catalog_commission_id 
		LEFT JOIN
			user_support 
		ON 
			user_support.user_support_id = {$this->tblName}.user_login_id
			{$filter}
		");
	}
	public static function attachSignature(array $data = null): bool
	{
		if(!$data['commission_per_user_id'] || !$data['signature'])
		{
			return false;
		}


		$CommissionPerUser = new self;

		if (!$CommissionPerUser->loadWhere('commission_per_user_id = ?', $data['commission_per_user_id'])) 
		{
			return false;
		}

		$CommissionPerUser->signature = $data['signature'];

		return $CommissionPerUser->save();
	}

	public static function appendCommissionToNetwork(array $network = null, int $user_login_id = null): array
	{
		$CommissionPerUser = new self;

		foreach ($network as $key => $level) {
			foreach ($level['users'] as $_key => $user) {
				$network[$key]['users'][$_key]['total'] = $CommissionPerUser->getAllSumFrom($user_login_id, $user['user_login_id']);
			}
		}

		return $network;
	}

	public static function addCommission(array $data = null): bool
	{
		if ((new CommissionPerUser)->existCommission($data['buy_per_user_id']) == false) {
			return self::add($data);
		}

		return false;
	}

	public static function saveCommissionsByCatalogCommission(array $catalog_commission, array $item = null, int $user_login_id_from = null, int $buy_per_user_id = null): bool
	{
		$network = (new UserReferral)->getSponsorByReverseLevel(3, $user_login_id_from);

		$amount = $catalog_commission['is_percentaje'] ? Util::getPercentaje($item['amount'], $catalog_commission['amount']) : $catalog_commission['amount'];

		$user_login_id = isset($network[$catalog_commission['level'] - 1]) ? $network[$catalog_commission['level'] - 1] : 1;
		$user_login_id = $user_login_id == 0 ? 1 : $user_login_id;

		if (isset($user_login_id)) {
			self::add([
				'user_login_id_from' => $user_login_id_from,
				'user_login_id' => $user_login_id,
				'buy_per_user_id' => $buy_per_user_id,
				'amount' => $amount,
				'package_id' => $item['package_id'],
				'catalog_commission_type_id' => $catalog_commission['catalog_commission_type_id'],
				'skype' => $user_login_id == 5
			]);
		}

		return false;
	}

	public static function add(array $data = null): bool
	{
		$CommissionPerUser = new CommissionPerUser;

		$skype = isset($data['skype']) && $data['skype'] == false ? false : true;

		if (!$skype) {
			if($CommissionPerUser->findField("buy_per_user_id = ? AND user_login_id = ? ", [$data['buy_per_user_id'], $data['user_login_id']],"buy_per_user_id"))
			{
				return false;
			}
		}

		if(isset($data['commission_per_user_id']) && $data['commission_per_user_id'] > 0)
		{
			$CommissionPerUser->loadWhere("commission_per_user_id = ?",[$data['commission_per_user_id']]);
		}

		$CommissionPerUser->user_login_id = $data['user_login_id'];
		$CommissionPerUser->buy_per_user_id = $data['buy_per_user_id'] ?? 0;
		$CommissionPerUser->catalog_commission_id = $data['catalog_commission_id'];
		$CommissionPerUser->user_login_id_from = $data['user_login_id_from'];
		$CommissionPerUser->amount = $data['amount'];
		$CommissionPerUser->catalog_currency_id = CatalogCurrency::USD;
		$CommissionPerUser->package_id = $data['package_id'];
		$CommissionPerUser->status = isset($data['file']) && !empty($data['file']) ? self::PENDING_FOR_SIGNATURE : self::PENDING_FOR_FILE;
		$CommissionPerUser->create_date = time();

		return $CommissionPerUser->save();
	}

	public static function addFromGain(array $data = null): bool
	{
		$CommissionPerUser = new CommissionPerUser;

		if (!$CommissionPerUser->loadWhere("gain_per_client_id = ? AND user_login_id = ? ", [$data['gain_per_client_id'], $data['user_login_id']])) {
			$CommissionPerUser->user_login_id = $data['user_login_id'];
			$CommissionPerUser->buy_per_user_id = $data['buy_per_user_id'] ?? 0;
			$CommissionPerUser->catalog_commission_type_id = $data['catalog_commission_type_id'];
			$CommissionPerUser->user_login_id_from = $data['user_login_id_from'];
			$CommissionPerUser->amount = $data['amount'];
			$CommissionPerUser->catalog_currency_id = CatalogCurrency::USD;
			$CommissionPerUser->package_id = $data['package_id'];
			$CommissionPerUser->status = self::PENDING_FOR_DISPERSION;
			$CommissionPerUser->create_date = isset($data['create_date']) ? $data['create_date'] : time();

			return $CommissionPerUser->save();
		}

		return false;
	}

	public function existCommission(int $buy_per_user_id = null): bool
	{
		if (isset($buy_per_user_id) === true) {
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.buy_per_user_id = '{$buy_per_user_id}'
					AND 
						{$this->tblName}.status != '" . Constants::DELETE . "'
					";

			return $this->connection()->field($sql) ? true : false;
		}

		return false;
	}

	public static function setCommissionAsDispersed(int $commission_per_user_id, int $transaction_per_wallet_id = null)
	{
		if (isset($commission_per_user_id, $transaction_per_wallet_id) === true) {
			$CommissionPerUser = new CommissionPerUser;

			if ($CommissionPerUser->loadWhere('commission_per_user_id = ?', $commission_per_user_id)) {
				$CommissionPerUser->deposit_date = time();
				$CommissionPerUser->status = self::COMPLETED;
				$CommissionPerUser->transaction_per_wallet_id = $transaction_per_wallet_id;

				return $CommissionPerUser->save();
			}
		}

		return false;
	}

	public function getPendingCommissions()
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.user_login_id,
					{$this->tblName}.user_login_id_from,
					{$this->tblName}.amount
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '" . self::PENDING_FOR_DISPERSION . "'
				";

		return $this->connection()->rows($sql);
	}

	public function getAll(int $user_login_id = null, string $filter = '')
	{
		if (!$user_login_id) {
			return false;
		}

		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.user_login_id,
					{$this->tblName}.buy_per_user_id,
					{$this->tblName}.package_id,
					{$this->tblName}.catalog_currency_id,
					{$this->tblName}.deposit_date,
					{$this->tblName}.transaction_per_wallet_id,
					{$this->tblName}.user_login_id_from,
					{$this->tblName}.create_date,
					{$this->tblName}.signature,
					{$this->tblName}.file,
					catalog_currency.currency,
					catalog_commission.name,
					user_data.names,
					{$this->tblName}.status,
					{$this->tblName}.amount
				FROM 
					{$this->tblName}
				LEFT JOIN
					catalog_currency 
				ON 
					catalog_currency.catalog_currency_id = {$this->tblName}.catalog_currency_id 
				LEFT JOIN
					catalog_commission 
				ON 
					catalog_commission.catalog_commission_id = {$this->tblName}.catalog_commission_id 
				LEFT JOIN
					user_data 
				ON 
					user_data.user_login_id = {$this->tblName}.user_login_id_from 
				WHERE 
					{$this->tblName}.user_login_id = '{$user_login_id}'
				AND
					{$this->tblName}.status IN (" . self::PENDING_FOR_FILE . "," . self::COMPLETED . ")
					{$filter}
				";

		return $this->connection()->rows($sql);
	}

	public function getSum(int $user_login_id = null, string $filter = null)
	{
		if (isset($user_login_id) === true) {
			$sql = "SELECT 
						SUM({$this->tblName}.amount) as amount
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
					AND
						{$this->tblName}.status IN (" . self::PENDING_FOR_DISPERSION . "," . self::COMPLETED . ")
						{$filter}
					";

			return $this->connection()->field($sql);
		}

		return false;
	}

	public static function saveCommissionsByCatalogCommissions(array $catalog_commissions, array $item = null, int $user_login_id_from = null, int $buy_per_user_id = null): bool
	{
		$saved = 0;

		foreach ($catalog_commissions as $catalog_commission) {
			if (self::saveCommissionsByCatalogCommission($catalog_commission, $item, $user_login_id_from, $buy_per_user_id)) {
				$saved++;
			}
		}

		return sizeof($catalog_commissions) == $saved;
	}

	public static function saveCommissionsByItems(array $items, int $user_login_id_from = null, int $buy_per_user_id = null)
	{
		if (isset($items, $user_login_id_from) === true) {
			foreach ($items as $item) {
				if (isset($item['catalog_commission']) && is_array($item['catalog_commission']) && !empty($item['catalog_commission'])) {
					self::saveCommissionsByCatalogCommissions($item['catalog_commission'], $item, $user_login_id_from, $buy_per_user_id);
				}
			}
		}
	}

	public function getSumFull(int $user_login_id = null, int $user_login_id_from = null)
	{
		if (isset($user_login_id, $user_login_id_from) === true) {
			$sql = "SELECT 
						SUM({$this->tblName}.amount) as amount
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
					AND
						{$this->tblName}.user_login_id_from = '{$user_login_id_from}'
					AND
						{$this->tblName}.status IN (" . self::PENDING_FOR_DISPERSION . "," . self::COMPLETED . ")
					";

			return $this->connection()->field($sql);
		}

		return false;
	}

	public function getAllSumFrom(int $user_login_id = null, int $user_login_id_from = null): float
	{
		if (isset($user_login_id, $user_login_id_from) === true) {
			$sql = "SELECT 
						SUM({$this->tblName}.amount) as total
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
					AND
						{$this->tblName}.user_login_id_from = '{$user_login_id_from}'
					AND
						{$this->tblName}.status IN (" . self::PENDING_FOR_DISPERSION . "," . self::COMPLETED . ")
					";

			if ($total = $this->connection()->field($sql)) {
				return $total;
			}
		}

		return 0;
	}

	public function getAllForAdmin(array $data = null)
	{
		$filter = "";

		if ($data['start'] ?? null) {
			$filter = "AND {$this->tblName}.create_date BETWEEN '" . strtotime($data['start']) . "' AND '" . strtotime($data['end']) . "'";
		}

		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.user_login_id,
					{$this->tblName}.buy_per_user_id,
					{$this->tblName}.package_id,
					{$this->tblName}.catalog_currency_id,
					{$this->tblName}.deposit_date,
					{$this->tblName}.transaction_per_wallet_id,
					{$this->tblName}.catalog_commission_type_id,
					{$this->tblName}.user_login_id_from,
					{$this->tblName}.create_date,
					catalog_currency.currency,
					catalog_commission_type.title,
					catalog_commission_type.commission_type,
					user_data.names,
					{$this->tblName}.status,
					{$this->tblName}.amount
				FROM 
					{$this->tblName}
				LEFT JOIN
					catalog_currency 
				ON 
					catalog_currency.catalog_currency_id = {$this->tblName}.catalog_currency_id 
				LEFT JOIN
					catalog_commission_type 
				ON 
					catalog_commission_type.catalog_commission_type_id = {$this->tblName}.catalog_commission_type_id 
				LEFT JOIN
					user_data 
				ON 
					user_data.user_login_id = {$this->tblName}.user_login_id 
				WHERE 
					{$this->tblName}.catalog_commission_type_id IN (" . CatalogCommissionType::FUND_MAM_ID . "," . CatalogCommissionType::RESIDUAL_MAM . "," . CatalogCommissionType::NETWORK_MAM_ID . ")
				AND 
					{$this->tblName}.status IN (" . self::PENDING_FOR_DISPERSION . "," . self::COMPLETED . ")
					{$filter}
				";

		return $this->connection()->rows($sql);
	}


	public static function formatMonths(array $months = null)
	{
		return array_map(function ($month) {
			$month['month_name'] = Util::getMonthById($month['month'] - 1);
			return $month;
		}, $months);
	}

	public function _getProfitsByMonths(int $user_login_id = null)
	{
		if (isset($user_login_id) === true) {
			$commissions = $this->getProfitsByMonths($user_login_id);

			if(!$commissions)
			{
				return false;
			}

			return self::formatMonths($this->getProfitsByMonths($user_login_id));
		}

		return false;
	}

	public function getProfitsByMonths(int $user_login_id = null)
	{
		if (isset($user_login_id) === true) {
			$sql = "SELECT
					MONTH(FROM_UNIXTIME({$this->tblName}.create_date)) as month, 
					YEAR(FROM_UNIXTIME({$this->tblName}.create_date)) as year, 
					SUM({$this->tblName}.amount) as total
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.user_login_id = '{$user_login_id}'
				GROUP BY 
					YEAR(FROM_UNIXTIME({$this->tblName}.create_date)),
					MONTH(FROM_UNIXTIME({$this->tblName}.create_date))
				ORDER BY 
					{$this->tblName}.create_date 
				DESC
				LIMIT 12
				";

			return $this->connection()->rows($sql);
		}

		return false;
	}


	public function getAllProfitsByMonths(array $months = null, int $user_login_id = null)
	{
		if (isset($months, $user_login_id) === true) {

			return array_map(function ($month) use ($user_login_id) {
				$first = strtotime(date("Y-m-01 00:00:00", strtotime("{$month['year']}-{$month['month']}-01")));
				$last = strtotime(date("Y-m-t 23:59:59", strtotime("{$month['year']}-{$month['month']}-01")));

				$month['profits'] = $this->getProfitsByDate($user_login_id, $first, $last);

				return $month;
			}, $months);
		}

		return false;
	}

	public function getProfitsByDate(int $user_login_id = null, string $first = null, string $last = null)
	{
		if (isset($user_login_id, $first, $last) === true) {
			$sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.create_date,
                {$this->tblName}.amount,
                catalog_commission_type.title
              FROM 
                {$this->tblName}
			  LEFT JOIN 
			  	catalog_commission_type
			  ON 
			  	catalog_commission_type.catalog_commission_type_id = {$this->tblName}.catalog_commission_type_id
              WHERE 
			  	{$this->tblName}.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.create_date
              BETWEEN 
                '{$first}'
              AND 
                '{$last}'
              AND 
                {$this->tblName}.status = '1'
              ";

			return $this->connection()->rows($sql);
		}

		return false;
	}
}
