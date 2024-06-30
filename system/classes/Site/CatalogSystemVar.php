<?php

namespace Site;

use HCStudio\Orm;

class CatalogSystemVar extends Orm {
    protected $tblName = 'catalog_system_var';
    public function __construct() {
        parent::__construct();
    }
}