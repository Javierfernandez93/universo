<?php

namespace Site;

use HCStudio\Orm;

class BlogCategory extends Orm {
    protected $tblName  = 'blog_category';
    
    public function __construct() {
        parent::__construct();
    }
}