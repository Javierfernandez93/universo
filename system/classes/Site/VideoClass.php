<?php

namespace Site;

use HCStudio\Orm;

class VideoClass extends Orm {
  protected $tblName  = 'video_class';

  public function __construct() {
    parent::__construct();
  }
  
  public static function add(array $data = null) 
  {
    $VideoClass = new self;
  }

  public function getAllByCatalog(int $catalog_video_class_id = null) 
  {
    if(isset($catalog_video_class_id) === true)
    {
      $sql = "SELECT
                  {$this->tblName}.{$this->tblName}_id,
                  {$this->tblName}.title,
                  {$this->tblName}.description,
                  {$this->tblName}.link,
                  {$this->tblName}.video,
                  {$this->tblName}.speaker,
                  {$this->tblName}.start_date,
                  {$this->tblName}.create_date
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.catalog_video_class_id = '{$catalog_video_class_id}'
              AND
                {$this->tblName}.status = '1'
              ";
              
      return $this->connection()->rows($sql);
    }
  }
}