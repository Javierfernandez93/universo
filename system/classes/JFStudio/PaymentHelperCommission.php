<?php
/**
*
*/

namespace JFStudio;

use Ebox\Package;

class PaymentHelperCommission
{
	public static $MAX_LEVELS = 5;
	public static $MAX_LEVELS_PLUS = 1;
	public static $INFINITE = -1;
	public static $OTHER_MONTHS = -1;
	public static $TRIMERSTRAL = 0;
	public static $MIN_EXCEDENT_POSITIONS = 10000;
	public static $MAX_EXCEDENT_POSITIONS = 3;

	public function getCommissions() { 
		return [
			0 => [
				'month' => 1,
				'packages_ids' => [Package::$INSCRIPTION],
				'commissions' => [
					0 => [
						'level' => 1,
						'ammount' => 600,
						'reason' => "UNILEVEL",
					],
					1 => [
						'level' => 2,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
				]
			],
		];
	}

	public function getBasicArrayComissions() { 
		return [
			0 => [
				'month' => -1,
				'packages_ids' => [Package::$BASICO],
				'commissions' => [
					0 => [
						'level' => 1,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
					1 => [
						'level' => 2,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
					2 => [
						'level' => 3,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
					3 => [
						'level' => 4,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
					4 => [
						'level' => 5,
						'ammount' => 1,
						'reason' => "UNILEVEL",
					],
				]
			],
		];
	}

	public function getEjecutivoArrayComissions() { 
		return [
			0 => [
				'month' => -1,
				'packages_ids' => [Package::$EJECUTIVO],
				'commissions' => [
					0 => [
						'level' => 1,
						'ammount' => 1.5,
						'reason' => "UNILEVEL",
					],
					1 => [
						'level' => 2,
						'ammount' => 1.5,
						'reason' => "UNILEVEL",
					],
					2 => [
						'level' => 3,
						'ammount' => 1.5,
						'reason' => "UNILEVEL",
					],
					3 => [
						'level' => 4,
						'ammount' => 1.5,
						'reason' => "UNILEVEL",
					],
					4 => [
						'level' => 5,
						'ammount' => 1.5,
						'reason' => "UNILEVEL",
					],
				]
			],
		];
	}

	public function getMasterArrayComissions() { 
		return [
			0 => [
				'month' => -1,
				'packages_ids' => [Package::$MASTER],
				'commissions' => [
					0 => [
						'level' => 1,
						'ammount' => 2,
						'reason' => "UNILEVEL",
					],
					1 => [
						'level' => 2,
						'ammount' => 2,
						'reason' => "UNILEVEL",
					],
					2 => [
						'level' => 3,
						'ammount' => 2,
						'reason' => "UNILEVEL",
					],
					3 => [
						'level' => 4,
						'ammount' => 2,
						'reason' => "UNILEVEL",
					],
					4 => [
						'level' => 5,
						'ammount' => 2,
						'reason' => "UNILEVEL",
					],
				]
			],
		];
	}
}