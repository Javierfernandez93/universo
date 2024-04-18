<?php

namespace Site;

use HCStudio\Orm;

class RealState extends Orm {
  protected $tblName  = 'real_state';

  public function __construct() {
    parent::__construct();
  }

  public static function safeAdd(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $RealState = new self;
    
    if($real_state_id = $RealState->findField('title = ?', $data['title'],"real_state_id"))
    {
      return $real_state_id;
    }
    
    return self::add($data);
  }

  public static function add(array $data = null)
  {
    if(!$data)
    {
      return false;
    }

    $RealState = new self;
    $RealState->loadArray($data);
    $RealState->link = isset($data['link']) ? strtolower($data['link']) : '';
    $RealState->create_date = time();

    return $RealState->save() ? $RealState->getId() : false;
  }
}