<?php

namespace Site;

use HCStudio\Orm;

class FollowPage extends Orm {
    protected $tblName  = 'follow_page';
    
    public function __construct() {
        parent::__construct();
    }

    public static function add(array $data = null)
    {
        if(!$data)
        {
            return false;
        }

        $FollowPage = new self;
        $FollowPage->loadArray($data);
        $FollowPage->create_date = time();
        
        return $FollowPage->save();
    }
}