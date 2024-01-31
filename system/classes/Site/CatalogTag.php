<?php

namespace Site;

use HCStudio\Orm;

class CatalogTag extends Orm {
    protected $tblName  = 'catalog_tag';
    
    public function __construct() {
        parent::__construct();
    }
}