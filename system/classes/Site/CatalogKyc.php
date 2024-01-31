<?php

namespace Site;

use HCStudio\Orm;

class CatalogKyc extends Orm {
    protected $tblName  = 'catalog_kyc';
    
    public function __construct() {
        parent::__construct();
    }
}