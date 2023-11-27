<?php

namespace Site;

use HCStudio\Orm;

class CatalogVideoClass extends Orm {
  protected $tblName  = 'catalog_video_class';

  const ACADEMY_RECORDED = 1;
  const ACADEMY_COMING = 2;

  const MENTORY_COMING_EVENTS = 3;
  const MENTORY_RECORDED_EVENTS = 4;
  
  public function __construct() {
    parent::__construct();
  }
  
  public static function add(array $data = null) 
  {
    $VideoClass = new self;
  }
 
  public function getType(int $catalog_video_class_id = null) 
  {
    if(isset($catalog_video_class_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.type
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.catalog_video_class_id = '{$catalog_video_class_id}'
              ";
              
      return $this->connection()->field($sql);
    }
  }
}