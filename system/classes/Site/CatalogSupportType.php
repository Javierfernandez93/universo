<?php

namespace Site;

use HCStudio\Orm;

class CatalogSupportType extends Orm {
  protected $tblName  = 'catalog_support_type';
  const ADMINISTRATOR = 1;
  const LEADERSHIP = 2;
  public function __construct() {
    parent::__construct();
  }
}