<?php

namespace Site;

use HCStudio\Orm;

class Ipn extends Orm {
  protected $tblName  = 'ipn';

  public function __construct() {
    parent::__construct();
  }
}