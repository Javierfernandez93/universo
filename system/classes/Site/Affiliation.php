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

  public function getAll()
  {
    return $this->connection()->rows("SELECT 
      {$this->tblName}.{$this->tblName}_id,
      {$this->tblName}.name, 
      user_support.user_support_id, 
      user_support.names 
    FROM 
      {$this->tblName}
    LEFT JOIN 
      user_support
    ON 
      user_support.user_support_id = {$this->tblName}.user_support_id
    WHERE
      {$this->tblName}.status = '1'
      "); 
  }
}