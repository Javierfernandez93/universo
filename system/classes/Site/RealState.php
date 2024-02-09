<?php

namespace Site;

use HCStudio\Orm;

class RealState extends Orm {
  protected $tblName  = 'real_state';

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $RealState = new self;
    $RealState->loadArray($data);
    $RealState->link = strtolower($data['link']);
    $RealState->create_date = time();

    return $RealState->save();
  }
}