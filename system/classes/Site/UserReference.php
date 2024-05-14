<?php

namespace Site;

use HCStudio\Orm;

class UserReference extends Orm {
  protected $tblName  = 'user_reference';

  public function __construct() {
    parent::__construct();
  }
}