<?php

namespace Site;

use HCStudio\Orm;
use HCStudio\Session;
use Site\SessionTakeByUserPerCourse;
use Site\SessionPerCourse;

class UserEnrolledInCourse extends Orm {
	protected $tblName = 'user_enrolled_in_course';
	public function __construct() {
		parent::__construct();
	}

	public static function setAs(array $data = null) 
    {
        if(!isset($data))
        {
            return false;
        }

        $UserEnrolledInCourse = new self;
        
        if(!$UserEnrolledInCourse->loadWhere("course_id = ? AND user_login_id = ?",[$data['course_id'],$data['user_login_id']]))
        {
            return false;
        }

        $UserEnrolledInCourse->end_date = time();

        return $UserEnrolledInCourse->save();
    }

	public static function setAsEnd(array $data = null) 
    {
        if(!isset($data))
        {
            return false;
        }

        $SessionTakeByUserPerCourse = new SessionTakeByUserPerCourse;
        $sessions_taked = $SessionTakeByUserPerCourse->countWhere("course_id = ? AND user_login_id = ?",[$data['course_id'],$data['user_login_id']]);

        if(!$sessions_taked)
        {
            return false;
        }

        $SessionPerCourse = new SessionPerCourse;
        $sessions = $SessionPerCourse->countWhere("course_id = ? AND status = ?",[$data['course_id'],1]);

        if(!$sessions)
        {
            return false;
        }

        if($sessions_taked != $sessions)
        {
            return false;
        }

        return self::setAs([
            'course_id' => $data['course_id'],
            'user_login_id' => $data['user_login_id'],
        ]);
    }

	public static function enrollInCourse(int $course_id = null,int $user_login_id = null) : bool
    {
        $UserEnrolledInCourse = new self;
        
        $UserEnrolledInCourse->user_login_id = $user_login_id;
        $UserEnrolledInCourse->course_id = $course_id;
        $UserEnrolledInCourse->create_date = time();

        return $UserEnrolledInCourse->save();
    }

	public function isEnrolled(int $course_id = null,int $user_login_id = null) : bool
    {
        if (isset($course_id,$user_login_id) === true) 
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.course_id = '{$course_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            return $this->connection()->field($sql) ? true : false;
        }

        return false;
	}
    
	public function get(array $data = null) : array|bool
    {
        if (!isset($data))
        {
            return false;
        }

        return $this->connection()->row("
            SELECT 
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.end_date
            FROM 
                {$this->tblName}
            WHERE 
                {$this->tblName}.user_login_id = '{$data['user_login_id']}'
            AND 
                {$this->tblName}.course_id = '{$data['course_id']}'
            AND 
                {$this->tblName}.status = '1'
        ");
	}
	
    public function isCourseFinished(array $data = null) : array|bool
    {
        if (!isset($data))
        {
            return false;
        }

        return $this->connection()->field("
            SELECT 
                {$this->tblName}.end_date
            FROM 
                {$this->tblName}
            WHERE 
                {$this->tblName}.user_login_id = '{$data['user_login_id']}'
            AND 
                {$this->tblName}.course_id = '{$data['course_id']}'
            AND 
                {$this->tblName}.end_date != '0'
            AND 
                {$this->tblName}.status = '1'
        ");
	}

    public function getMyCourses($user_login_id = null)
    {
        if (isset($user_login_id) === true) 
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        course.course_id,
                        course.title
                    FROM 
                        {$this->tblName}
                    LEFT JOIN 
                        course
                    ON
                        {$this->tblName}.course_id = course.course_id
                        
                    WHERE 
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            
            return $this->connection()->rows($sql);
        }

        return false;
    }

    public function getCoutEnrolledCourses($user_login_id = null) 
    {
        if (isset($user_login_id) === true) 
        {
            $sql = "SELECT 
                        COUNT({$this->tblName}.{$this->tblName}_id) as c
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.user_login_id = '{$user_login_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
	}

    public function countUsersInCourse($course_id = null) 
    {
        if (isset($course_id) === true) 
        {
            $sql = "SELECT 
                        COUNT({$this->tblName}.{$this->tblName}_id) as c
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.course_id = '{$course_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
    }
}