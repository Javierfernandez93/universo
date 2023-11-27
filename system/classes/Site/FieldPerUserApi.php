<?php

namespace Site;

use HCStudio\Orm;

use JFStudio\Constants;

class FieldPerUserApi extends Orm {
  protected $tblName  = 'field_per_user_api';
  public $logged = false;

  public function __construct() {
    parent::__construct();
  }
}