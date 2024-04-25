<?php

namespace Site;

use HCStudio\Orm;

class CatalogPromotion extends Orm {
  protected $tblName  = 'catalog_promotion';
  
  public function __construct() {
    parent::__construct();
  }
}