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

  public function getAll()
  {
    return $this->connection()->rows("
      SELECT 
        {$this->tblName}.{$this->tblName}_id,
        {$this->tblName}.title,
        {$this->tblName}.link,  
        {$this->tblName}.image,
        {$this->tblName}.real_state_developer_id,
        {$this->tblName}.sold_out,
        {$this->tblName}.main,
        {$this->tblName}.status,
        {$this->tblName}.create_date,
        real_state_developer.name
      FROM 
        {$this->tblName}
      LEFT JOIN
        real_state_developer
      ON
        real_state_developer.real_state_developer_id = {$this->tblName}.real_state_developer_id
      WHERE 
        {$this->tblName}.status != '-1'
      ");
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