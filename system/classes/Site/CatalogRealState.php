<?php

namespace Site;

use HCStudio\Orm;

class CatalogRealState extends Orm {
    protected $tblName  = 'catalog_real_state';
    
    public function __construct() {
        parent::__construct();
    }
}