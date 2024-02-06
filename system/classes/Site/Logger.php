<?php

namespace Site;

use HCStudio\Orm;

class Logger extends Orm {
  protected $tblName  = 'logger';

  const COMMISSION_PER_USER = 'COMMISSION_PER_USER';
  
  public function __construct() {
    parent::__construct();
  }
  
  public function getAll(array $data = null) 
  {
    $loggs = $this->findAll("status = ?",1);

    if(!$loggs)
    {
      return false;
    }

    $UserSupport = new UserSupport(false,false);
    return array_map(function($logg) use($UserSupport){
      $logg['data'] = json_decode($logg['data'], true); 
      $logg['names'] = $UserSupport->getNames($logg['data']['user_support_id']); 
      return $logg;
    }, $loggs);
  }

  public static function add(array $data = null) 
  {
    if(!$data)
    {
        return false;
    }

    $Logger = new self;
    $Logger->data = json_encode($data);
    $Logger->create_date = time();
    
    return $Logger->save();
  }
}