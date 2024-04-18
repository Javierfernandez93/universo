<?php

namespace Site;

use HCStudio\Orm;

class Affiliation extends Orm {
  protected $tblName = 'affiliation';

  public function __construct() {
    parent::__construct();
  }

  public static function safeAdd(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $Affiliation = new self;
    
    if($affiliation_id = $Affiliation->findField('name = ?', $data['name'],"affiliation_id"))
    {
      return $affiliation_id;
    }
    
    return self::add($data);
  }

  public static function add(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $Affiliation = new self;
    $Affiliation->loadArray($data);
    $Affiliation->create_date = time();

    return $Affiliation->save() ? $Affiliation->getId() : false;
  }
}