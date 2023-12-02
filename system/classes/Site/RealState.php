<?php

namespace Site;

use HCStudio\Orm;

class RealState extends Orm {
  protected $tblName  = 'real_state';

  public function __construct() {
    parent::__construct();
  }
}