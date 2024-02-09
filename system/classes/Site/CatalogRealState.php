<?php

namespace Site;

use HCStudio\Orm;

class CatalogRealState extends Orm {
    protected $tblName  = 'real_state';
    
    public function __construct() {
        parent::__construct();
    }
}