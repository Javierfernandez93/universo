<?php

namespace Site;

use HCStudio\Orm;

class PullProperty extends Orm {
    protected $tblName  = 'pull_property';
    
    public function __construct() {
        parent::__construct();
    }
   
    public static function pull(array $data = null) {
        if(!$data)
        {
            return false;
        }


        $PullProperty = new self;
        $PullProperty->user_login_id = $data['user_login_id'];
        $PullProperty->property_id = $data['property_id'];
        $PullProperty->image = $data['image'];
        $PullProperty->create_date = time();

        return $PullProperty->save();
    }
}