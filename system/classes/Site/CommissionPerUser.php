<?php

namespace Site;

use HCStudio\Orm;

use Site\CatalogCurrency;
use Site\UserReferral;
use HCStudio\Util;
use JFStudio\Constants;

class CommissionPerUser extends Orm
{
	protected $tblName = 'commission_per_user';

	//** status */
	const PENDING_FOR_DISPERSION = 1;
	const COMPLETED = 2;
	const PROFIT_MAMP_NETWORK = 30;
	const PROFIT_MAMP_SPONSOR = 3;
	const DEFAULT_NETWORK_MAM_LEVELS = 10;

	public function __construct()
	{
		parent::__construct();
	}

	public static function addFundMamCommission(array $products = null, int $user_login_id = null, int $buy_per_user_id = null): bool
	{
		if ($founded = array_sum(array_column($products, "quantity"))) {
			if ($profitSplit = round(Util::getPercentaje($founded, self::PROFIT_MAMP_SPONSOR), 3, PHP_ROUND_HALF_UP)) {
				if ($referral_id = (new UserReferral)->getReferralId($user_login_id)) {
					self::add([
						'user_login_id_from' => $user_login_id,
						'user_login_id' => $referral_id,
						'buy_per_user_id' => $buy_per_user_id,
						'gain_per_client_id' => 0,
						'amount' => $profitSplit,
						'package_id' => 0,
						'catalog_commission_type_id' => CatalogCommissionType::FUND_MAM_ID,
					]);

					return true;
				}
			}
		}

		return false;
	}

	public static function addMamCommission(array $data = null): bool
	{
		$profitSplit = round(Util::getPercentaje($data['profit'], self::PROFIT_MAMP_NETWORK), 3, PHP_ROUND_HALF_UP);
		// $profitSplit = round($data['profit'],2, PHP_ROUND_HALF_DOWN);

		$network = (new UserReferral)->getSponsorByReverseLevel(self::DEFAULT_NETWORK_MAM_LEVELS, $data['user_login_id']);

		$CatalogCommission = new CatalogCommission;

		$gived = 0;

		if ($catalog_commissions = $CatalogCommission->getAllBycatalogCommissionTypeId(CatalogCommissionType::NETWORK_MAM_ID)) {
			foreach ($catalog_commissions as $catalog_commission) {
				$percentaje = round((($catalog_commission['amount'] * 100) / self::PROFIT_MAMP_NETWORK), 2, PHP_ROUND_HALF_DOWN);

				$amount = $catalog_commission['is_percentaje'] ? Util::getPercentaje($profitSplit, $percentaje) : $catalog_commission['amount'];

				if ($catalog_commission['commission_type'] == CatalogCommissionType::NETWORK_MAM) {
					if (isset($network[$catalog_commission['level'] - 1])) {
						if ($network[$catalog_commission['level'] - 1] > 0) {
							// echo "$ {$amount} para el nivel {$catalog_commission['level']} ID {$network[$catalog_commission['level']-1]}\n";
							$gived += $amount;

							self::addFromGain([
								'user_login_id_from' => $data['user_login_id'],
								'user_login_id' => $network[$catalog_commission['level'] - 1],
								'gain_per_client_id' => $data['gain_per_client_id'],
								'amount' => $amount,
								'package_id' => 0,
								'create_date' => strtotime(date('Y-m-d 23:59:59', strtotime('last day of previous month'))),
								'catalog_commission_type_id' => $catalog_commission['catalog_commission_type_id'],
							]);
						}
					}
				}
			}

			if ($gived < $profitSplit) {
				self::addFromGain([
					'user_login_id_from' => $data['user_login_id'],
					'user_login_id' => 1,
					'gain_per_client_id' => $data['gain_per_client_id'],
					'amount' => $profitSplit - $gived,
					'package_id' => 0,
					'create_date' => strtotime(date('Y-m-d 23:59:59', strtotime('last day of previous month'))),
					'catalog_commission_type_id' => CatalogCommissionType::RESIDUAL_MAM
				]);
			}

			return true;
		}

		return false;
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

		if (isset($data['skype']) && $data['skype'] == false) {
			$CommissionPerUser->loadWhere("buy_per_user_id = ? AND user_login_id = ? ", [$data['buy_per_user_id'], $data['user_login_id']]);
		}

		if ($CommissionPerUser->getId() == 0) {
			$CommissionPerUser->user_login_id = $data['user_login_id'];
			$CommissionPerUser->buy_per_user_id = $data['buy_per_user_id'] ?? 0;
			$CommissionPerUser->catalog_commission_type_id = $data['catalog_commission_type_id'];
			$CommissionPerUser->user_login_id_from = $data['user_login_id_from'];
			$CommissionPerUser->amount = $data['amount'];
			$CommissionPerUser->catalog_currency_id = CatalogCurrency::USD;
			$CommissionPerUser->package_id = $data['package_id'];
			$CommissionPerUser->status = self::PENDING_FOR_DISPERSION;
			$CommissionPerUser->create_date = time();

			return $CommissionPerUser->save();
		}

		return false;
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
		if (isset($user_login_id) === true) {
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
						user_data.user_login_id = {$this->tblName}.user_login_id_from 
					WHERE 
						{$this->tblName}.user_login_id = '{$user_login_id}'
					AND
						{$this->tblName}.status IN (" . self::PENDING_FOR_DISPERSION . "," . self::COMPLETED . ")
						{$filter}
					";

			return $this->connection()->rows($sql);
		}

		return false;
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
