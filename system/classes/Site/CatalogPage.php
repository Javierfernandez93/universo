<?php

namespace Site;

use HCStudio\Orm;

class CatalogPage extends Orm {
    protected $tblName  = 'catalog_page';
    
    public function __construct() {
        parent::__construct();
    }
    
    public static function add(array $data = null) {
        if(!$data) {
            return false;
        }

        $CatalogPage = new self;

        if($CatalogPage->loadWhere("page = ?",$data['page'])) {
            return false;
        }
        
        $CatalogPage->loadArray($data);
        $CatalogPage->create_date = time();

        return $CatalogPage->save();
    }
}