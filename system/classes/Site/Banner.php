<?php

namespace Site;

use HCStudio\Orm;

class Banner extends Orm {
  protected $tblName  = 'banner';

  public function __construct() {
    parent::__construct();
  }

  public static function add(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $Banner = new self;
    $Banner->loadArray($data);
    $Banner->link = strtolower($data['link']);
    $Banner->create_date = time();

    return $Banner->save();
  }
}