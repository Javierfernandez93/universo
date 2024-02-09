<?php

namespace Site;

use HCStudio\Orm;

class FollowPage extends Orm {
    protected $tblName  = 'follow_page';
    
    public function __construct() {
        parent::__construct();
    }

    public function getAll(int $user_login_id = null)
    {
        if(!$user_login_id)
        {
            return false;
        }

        $pages = $this->connection()->rows("
            SELECT 
                COUNT({$this->tblName}.{$this->tblName}_id) as visits,
                {$this->tblName}.catalog_page_id,
                catalog_page.page,
                catalog_page.code,
                catalog_page.description,
                catalog_page.route,
                {$this->tblName}.create_date
            FROM 
                {$this->tblName}
            LEFT JOIN 
                catalog_page 
            ON 
                {$this->tblName}.catalog_page_id = catalog_page.catalog_page_id
            WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
            AND 
                {$this->tblName}.status = '1'
            GROUP BY 
                {$this->tblName}.catalog_page_id
        ");

        if(!$pages)
        {
            return false;
        }

        return $pages;
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