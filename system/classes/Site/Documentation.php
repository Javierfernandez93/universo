<?php

namespace Site;

use HCStudio\Orm;

class Documentation extends Orm {
    protected $tblName  = 'documentation';
    public function __construct() {
        parent::__construct();
    }

    public function getDocumentationById(int $documentation_id = null) : array|bool
    {
        if($documentation = $this->_getDocumentationById($documentation_id))
        {
            $documentation['data'] = json_decode($documentation['data'],true);

            return $documentation;
        }
    
        return false;
    }

    public function _getDocumentationById(int $documentation_id = null) : array|bool
    {
        if(isset($documentation_id)) 
        {
            $sql = "SELECT
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.title,
                        {$this->tblName}.data,
                        {$this->tblName}.create_date
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.documentation_id = '{$documentation_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
    
            return $this->connection()->row($sql);
        }

        return false;
    }

    public function getAll() 
    {
        $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.title,
                    {$this->tblName}.data,
                    {$this->tblName}.create_date
                FROM 
                    {$this->tblName}
                WHERE 
                    {$this->tblName}.status = '1'
                ";

        return $this->connection()->rows($sql);
    }
    
    public function getAllTitles() 
    {
        $sql = "SELECT
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.title
                FROM 
                    {$this->tblName}
                WHERE 
                    {$this->tblName}.status = '1'
                ORDER BY 
                    {$this->tblName}.order_id 
                ASC 
                ";

        return $this->connection()->rows($sql);
    }
}