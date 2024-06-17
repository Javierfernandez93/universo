<?php

namespace Site;

use HCStudio\Orm;

use Constants;

class SessionPerCourse extends Orm {
	protected $tblName = 'session_per_course';
	public static $TEXT = 1;
	public static $VIDEO = 2;
	public static $AUDIO = 3;
	public function __construct() {
		parent::__construct();
	}

    public static function removeSessions(int $course_id = null) : bool
    {
        
        if(!isset($course_id))
        {
            return false;
        }
        
        $SessionPerCourse = new self;

        $sessions = $SessionPerCourse->findAll("course_id = ?",$course_id,['session_per_course_id']);

        if(!$sessions)
        {
            return false;
        }

        foreach($sessions as $session)
        {
            (new SessionPerCourse)->where("session_per_course_id","=",$session['session_per_course_id'])->updateStatus(Constants::DELETE);
        }

        return true;
    }

    public static function removeSingleSession(int $course_id, int $session_id): bool {
        $SessionPerCourse = new self;
        $session = $SessionPerCourse->findField("course_id = ? and session_per_course_id = ?", [$course_id, $session_id], 'session_per_course_id');
        if ($session === false) {
            return false;
        }
        return $SessionPerCourse->where("session_per_course_id","=",$session_id)->updateStatus(Constants::DELETE);
    }

    public static function addSession(array $data = null) : bool
    {
        $SessionPerCourse = new self;
        
        if(isset($data['session_per_course_id']))
        {
            $SessionPerCourse->loadWhere("session_per_course_id = ?", $data['session_per_course_id']);
        }

        $SessionPerCourse->title = isset($data['title']) ? $data['title'] : '';
        $SessionPerCourse->order_number = isset($data['order']) ? $data['order'] : 0;
        $SessionPerCourse->has_previsualization = isset($data['has_previsualization']) ? $data['has_previsualization'] : 0;
        $SessionPerCourse->course = isset($data['course']) ? $data['course'] : 0;
        $SessionPerCourse->catalog_multimedia_id = isset($data['catalog_multimedia_id']) ? $data['catalog_multimedia_id'] : 0;        
        $SessionPerCourse->aviable = isset($data['aviable']) ? $data['aviable'] : 1;      
        $SessionPerCourse->create_date = time();
        $SessionPerCourse->course_id = isset($data['course_id']) ? $data['course_id'] : 0;
        $SessionPerCourse->status = Constants::AVIABLE;
        
        if(isset($data['attach_session_per_course_id']))
        {
            $SessionPerCourse->attach_session_per_course_id = $data['attach_session_per_course_id'];
        }

        if(!$SessionPerCourse->save())
        {
            return false;
        }

        if(isset($data['sessions']) && sizeof($data['sessions']) > 0)
        {
            foreach($data['sessions'] as $key => $session)
            {
                $session['attach_session_per_course_id'] = $SessionPerCourse->getId();
                $session['order_number'] = $key + 1;
                $session['course_id'] = $SessionPerCourse->course_id;

                $SessionPerCourse->addSession($session);
            }
        }

        return true;
    }

    public function getList(int $course_id = null, int $parent_id = 0) 
    {
        if(isset($course_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.catalog_multimedia_id,
                        {$this->tblName}.order_number,
                        {$this->tblName}.course,
                        {$this->tblName}.attach_session_per_course_id,
                        {$this->tblName}.has_previsualization,
                        {$this->tblName}.create_date,
                        {$this->tblName}.aviable,
                        catalog_multimedia.multimedia,
                        {$this->tblName}.title
                    FROM 
                        {$this->tblName}
                    LEFT JOIN 
                        catalog_multimedia
                    ON 
                        catalog_multimedia.catalog_multimedia_id = {$this->tblName}.catalog_multimedia_id
                    WHERE 
                        {$this->tblName}.course_id = '{$course_id}'
                    AND
                        {$this->tblName}.status = '1'
                    AND
                        {$this->tblName}.attach_session_per_course_id = {$parent_id}
                    GROUP BY {$this->tblName}.{$this->tblName}_id
                    ORDER BY 
                        {$this->tblName}.order_number 
                    ASC
                    ";
            $rows = $this->connection()->rows($sql);
            return $rows !== false ? $rows : [];
        }

        return [];
	}
    
    public function getListAttach(int $session_per_course_id = null) 
    {
        if(isset($session_per_course_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.catalog_multimedia_id,
                        {$this->tblName}.order_number,
                        {$this->tblName}.course,
                        {$this->tblName}.has_previsualization,
                        {$this->tblName}.create_date,
                        {$this->tblName}.aviable,
                        catalog_multimedia.multimedia,
                        {$this->tblName}.title
                    FROM 
                        {$this->tblName}
                    LEFT JOIN 
                        catalog_multimedia
                    ON 
                        catalog_multimedia.catalog_multimedia_id = {$this->tblName}.catalog_multimedia_id
                    WHERE 
                        {$this->tblName}.attach_session_per_course_id = '{$session_per_course_id}'
                    AND
                        {$this->tblName}.status = '1'
                    GROUP BY {$this->tblName}.{$this->tblName}_id
                    ORDER BY 
                        {$this->tblName}.order_number 
                    ASC
                    ";
            return $this->connection()->rows($sql);
        }

        return false;
	}
    
    public function getCourseId($session_per_course_id = null) 
    {
        if(isset($session_per_course_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.course_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.status = '1'
                    AND
                        {$this->tblName}.session_per_course_id = '{$session_per_course_id}'
                    ";

            return $this->connection()->field($sql);
        }

        return false;
	}
}