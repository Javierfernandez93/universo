<?php

namespace Site;

use HCStudio\Orm;

class Blog extends Orm {
  protected $tblName  = 'blog';

  public function __construct() {
    parent::__construct();
  }
  
  public function getAll() {
    $entries = $this->connection()->rows("
      SELECT  
        {$this->tblName}.{$this->tblName}_id,
        {$this->tblName}.sub_title,
        {$this->tblName}.image,
        {$this->tblName}.content,
        {$this->tblName}.create_date,
        blog_category.category,
        {$this->tblName}.title
      FROM
        {$this->tblName}
      LEFT JOIN 
        blog_category 
      ON 
        blog_category.blog_category_id = {$this->tblName}.blog_category_id
      WHERE 
        {$this->tblName}.status = '1'
    ");

    if(!$entries)
    {
      return false;
    }

    return array_map(function($entry){
      $entry['title_sanitized'] = strip_tags($entry['title']);
      return $entry;
    },$entries);
  }
}