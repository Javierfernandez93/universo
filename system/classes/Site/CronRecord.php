<?php

namespace Site;

use HCStudio\Orm;

class CronRecord extends Orm {
	protected $tblName = 'cron_record';
	public function __construct() {
		parent::__construct();
	}

	public static function add(array $data = null) : bool
	{
        if(isset($data) === true)
        {
            $CronRecord = new self;
            $CronRecord->cron_id = $data['cron_id'];
            $CronRecord->create_date = time();
            
            return $CronRecord->save();
        }

        return false;
	}
}