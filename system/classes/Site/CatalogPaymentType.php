<?php

namespace Site;

use HCStudio\Orm;

class CatalogPaymentType extends Orm {
  protected $tblName  = 'catalog_payment_type';
  
  public function __construct() {
    parent::__construct();
  }
}