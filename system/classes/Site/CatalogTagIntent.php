<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Util;

class CatalogTagIntent extends Orm {
    protected $tblName  = 'catalog_tag_intent';
    
    public function __construct() {
        parent::__construct();
    }

    public static function fixTag(string $tag = null) : string 
    {
        return  strtolower(preg_replace('/\s+/', '_', Util::sanitizeString($tag, true)));
    }

    public static function add(array $data = null) : int
    {
        $CatalogTagIntent = new self;
        $CatalogTagIntent->tag = $data['tag'];
        $CatalogTagIntent->has_response = 1;
        $CatalogTagIntent->create_date = time();
        
        if($CatalogTagIntent->save())
        {
            return $CatalogTagIntent->getId();
        }

        return false;
    }

    public function getCatalogTagIntentIdByTag($tag = null)
    {
    	if (isset($tag) === true) {
    		$sql = "SELECT 
    					{$this->tblName}.{$this->tblName}_id
    				FROM
    					{$this->tblName}
    				WHERE 
    					{$this->tblName}.tag = '{$tag}'
    				AND 
    					{$this->tblName}.status = '1'
    				";

    		return $this->connection()->field($sql);
    	}
    }

    public function hasResponse(int $catalog_tag_intent_id = null)
    {
        if (isset($catalog_tag_intent_id) === true) 
        {
            $sql = "SELECT 
                        {$this->tblName}.has_response
                    FROM
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.catalog_tag_intent_id = '{$catalog_tag_intent_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";

            return $this->connection()->field($sql);
        }
    }
}