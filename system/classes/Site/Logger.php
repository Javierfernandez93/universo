<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Util;

class Logger extends Orm {
  protected $tblName  = 'logger';

  const COMMISSION_PER_USER = 'COMMISSION_PER_USER';
  const ACTIONS = [
    'method' => null,
    'table' => null,
    'field' => null,
    'action' => null,
    'value' => null,
    'type' => 'success',
    'user_support_id' => null
  ];
  
  public function __construct() {
    parent::__construct();
  }
  
  public function getAll() 
  {
    $loggs = $this->allByOrdered("status = ?",1);

    if(!$loggs)
    {
      return false;
    }

    $UserSupport = new UserSupport(false,false);

    return array_map(function($logg) use($UserSupport){
      $logg['data'] = json_decode($logg['data'], true); 
      $logg['names'] = $UserSupport->getNames($logg['data']['user_support_id']); 
      $logg['data']['value'] = Util::isJson($logg['data']['value']) ? json_decode($logg['data']['value'], true) : $logg['data']['value'];
      return $logg;
    }, $loggs);
  }

  public static function add(array $data = null) 
  {
    if(!$data)
    {
        return false;
    }

    $data = [
      ...self::ACTIONS,
      ...$data
    ];
    $Logger = new self;
    $Logger->data = json_encode($data);
    $Logger->create_date = time();
    
    return $Logger->save();
  }
}