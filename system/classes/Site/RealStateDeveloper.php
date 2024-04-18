<?php

namespace Site;

use HCStudio\Orm;

class RealStateDeveloper extends Orm {
  protected $tblName  = 'real_state_developer';

  public function __construct() {
    parent::__construct();
  }

  public static function safeAdd(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $RealStateDeveloper = new self;
    
    if($real_state_developer_id = $RealStateDeveloper->findField('name = ?', $data['name'],"real_state_developer_id"))
    {
      return $real_state_developer_id;
    }
    
    return self::add($data);
  }

  public static function add(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $RealStateDeveloper = new self;
    $RealStateDeveloper->loadArray($data);
    $RealStateDeveloper->create_date = time();

    return $RealStateDeveloper->save() ? $RealStateDeveloper->getId() : false;
  }
}