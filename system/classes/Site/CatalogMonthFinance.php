<?php

namespace Site;

use HCStudio\Orm;

class CatalogMonthFinance extends Orm {
  protected $tblName  = 'catalog_month_finance';
  
  public function __construct() {
    parent::__construct();
  }
}