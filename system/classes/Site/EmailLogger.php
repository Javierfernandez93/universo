<?php

namespace Site;

final class EmailLogger extends \HCStudio\Orm
{
    protected $tblName  = 'email_logger';

    public function __construct() {
        parent::__construct();
    }

    public static function add(array $data = []) : bool
    {
        if(!$data)
        {
            return false;
        }

        if(!$data['email'])
        {
            return false;
        }

        if(!$data['template'])
        {
            return false;
        }

        $EmailLogger = new self;

        $EmailLogger->loadArray($data);
        $EmailLogger->create_date = time();
        
        return $EmailLogger->save();
    }

    public function isInLog(array $data = []) : bool
    {
        if(!$data['email'])
        {
            return false;
        }

        if(!$data['template'])
        {
            return false;
        }

        return $this->findField("email = ? AND template = ? AND status = 1",[$data['email'],$data['template']],'email_logger_id');
    }
}