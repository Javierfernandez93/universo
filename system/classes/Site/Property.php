<?php

namespace Site;

use HCStudio\Orm;

class Property extends Orm {
    protected $tblName  = 'property';
    
    public function __construct() {
        parent::__construct();
    }
   
    public static function add(array $data = null) {
        if(!$data) {
            return false;   
        }   
        
        $Property = new self;
        $Property->loadArray($data);
        $Property->create_date = time();   
        
        return $Property->save();
    }
    public function getAll() {
        $properties = $this->connection()->rows("
            SELECT 
                {$this->tblName}.*,
                real_state.title as real_state
            FROM
                {$this->tblName} 
            LEFT JOIN 
                real_state 
            ON 
                real_state.real_state_id = {$this->tblName}.real_state_id
            WHERE 
                {$this->tblName}.status = '1'
            ORDER BY 
                {$this->tblName}.create_date 
            DESC
        ");

        if(!$properties)
        {
            return false;
        }

        return array_map(function($property){
            $property['pull'] = (new PullProperty)->findRow("property_id = '{$property['property_id']}'");
            return $property;
        },$properties);
    }
}