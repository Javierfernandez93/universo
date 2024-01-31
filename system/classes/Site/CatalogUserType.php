<?php

namespace Site;

use HCStudio\Orm;

class CatalogUserType extends Orm {
  protected $tblName  = 'catalog_user_type';
  const SELLER = 1;
  const LEAD = 2;
  const CLIENT = 3;
  
  public function __construct() {
    parent::__construct();
  }
}