<?php

namespace Site;

use HCStudio\Orm;
use Constants;

use Site\SessionPerCourse;

class Course extends Orm {
	protected $tblName = 'course';

    /* target > 0 package_id */
    const ALL = -1;
    const INACTIVES = 0;
    const ACTIVEs = 1;
    
	public function __construct() {
		parent::__construct();
	}

	public static function setState(array $data = null) : bool
    {
        $Course = new self;
        
        if($Course->loadWhere("course_id = ?", $data['course_id']))
        {
            $Course->status = $data['status'];
            
            return $Course->save();
        }

        return false;
    }

	public static function addCourse(array $data = null)
    {
        $Course = new self;

        if(isset($data['course_id']))
        {
            $Course->loadWhere("course_id = ?",$data['course_id']);
        } else {
            $Course->create_date = time();
        }

        $is_free = filter_var($data['free'], FILTER_VALIDATE_BOOLEAN);

        $Course->title = $data['title'];
        // $Course->user_support_id = $data['user_support_id'];
        $Course->description = isset($data['description']) ? $data['description'] : '';
        $Course->image = isset($data['image']) ? $data['image'] : '';
        $Course->price = isset($data['price']) ? $data['price'] : 0;
        $Course->duration = isset($data['duration']) ? $data['duration'] : '';
        $Course->target = isset($data['target']) ? $data['target'] : self::ALL;
        $Course->catalog_course_type_id = $is_free ? 1 : 2;
        $Course->price = $is_free ? 0 : $Course->price;

        // TODO: Set a default value either via database or by class without using magic numbers
        $default_currency_id = 8; // USD

        $Course->attach_session_per_course_id = isset($data['attach_session_per_course_id']) && !empty($data['attach_session_per_course_id']) ? $data['attach_session_per_course_id'] : 0;
        $Course->catalog_course_id = $data['catalog_course_id'];
        $Course->catalog_currency_id = isset($data['catalog_currency_id']) && !empty($data['catalog_currency_id']) ? $data['catalog_currency_id'] : $default_currency_id;   
        $Course->tag = $data['tag'];

        if($Course->save())
        {
            foreach($data['sessions'] as $key => $session)
            {
                $session['course_id'] = $Course->getId();
                $session['order'] = $key+1;

                SessionPerCourse::addSession($session);
            }

            if(isset($data['deleted_lessons']))
            {
                foreach($data['deleted_lessons'] as $lesson_id){
                    if (!is_numeric($lesson_id)) {
                        continue;
                    }
                    $_was_removed = SessionPerCourse::removeSingleSession($data['course_id'], $lesson_id);
                }
            }
        }

        return $Course->getId();
    }

	public function getList()
    {
        return $this->connection()->rows("SELECT 
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.title,
                    {$this->tblName}.description,
                    {$this->tblName}.price,
                    {$this->tblName}.create_date,
                    {$this->tblName}.target,
                    {$this->tblName}.image,
                    catalog_course.name,
                    catalog_course_type.catalog_course_type_id,
                    catalog_course_type.type,
                    CONCAT_WS(' ',user_support.names,user_support.last_name,user_support.sur_name) as names
                FROM 
                    {$this->tblName}
                LEFT JOIN 
                    catalog_course
                ON
                    catalog_course.catalog_course_id = {$this->tblName}.catalog_course_id
                LEFT JOIN 
                    catalog_course_type
                ON
                    catalog_course_type.catalog_course_type_id = {$this->tblName}.catalog_course_type_id
                LEFT JOIN 
                    user_support
                ON
                    user_support.user_support_id = {$this->tblName}.user_support_id
                WHERE 
                    {$this->tblName}.status = '".Constants::AVIABLE."'
                ");
	}

    public function getFormatted(array $data = null) 
    {
        if(isset($data) === true)
        {
            if($course = $this->get($data['course_id']))
            {
                $CommentPerCourse = new CommentPerCourse;
                $LikePerCourse = new LikePerCourse;

                $course['comments'] = $CommentPerCourse->getAll($data['course_id']);
                $course['hasComment'] = $CommentPerCourse->hasComment($data);
                $course['hasRank'] = $LikePerCourse->hasRank($data);
                
                return $course;
            }
        }

        return false;
	}
    
    public function get($course_id = null) 
    {
        if(isset($course_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.title,
                        {$this->tblName}.description,
                        {$this->tblName}.price,
                        {$this->tblName}.create_date,
                        {$this->tblName}.image,
                        user_support.image as user_image,
                        catalog_course.name,
                        catalog_course_type.type
                    FROM 
                        {$this->tblName}
                    LEFT JOIN 
                        catalog_course
                    ON
                        catalog_course.catalog_course_id = {$this->tblName}.catalog_course_id
                    LEFT JOIN 
                        catalog_course_type
                    ON
                        catalog_course_type.catalog_course_type_id = {$this->tblName}.catalog_course_type_id
                    LEFT JOIN 
                        user_support
                    ON
                        user_support.user_support_id = {$this->tblName}.user_support_id
                    WHERE 
                        {$this->tblName}.status = '".Constants::AVIABLE."'
                    AND
                        {$this->tblName}.{$this->tblName}_id = '{$course_id}'
                    ";
            
            return $this->connection()->row($sql);
        }

        return false;
	}

    public function getCourses()
    {   
        return $this->connection()->rows("SELECT 
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.title,
                    {$this->tblName}.description,
                    {$this->tblName}.price,
                    {$this->tblName}.create_date,
                    {$this->tblName}.status,
                    {$this->tblName}.image,
                    catalog_currency.currency,
                    catalog_course.name,
                    catalog_course_type.type,
                    user_support.names
                FROM 
                    {$this->tblName}
                LEFT JOIN 
                    catalog_course
                ON
                    catalog_course.catalog_course_id = {$this->tblName}.catalog_course_id
                LEFT JOIN 
                    catalog_course_type
                ON
                    catalog_course_type.catalog_course_type_id = {$this->tblName}.catalog_course_type_id
                LEFT JOIN 
                    user_support
                ON
                    user_support.user_support_id = {$this->tblName}.user_support_id
                LEFT JOIN 
                    catalog_currency
                ON
                    catalog_currency.catalog_currency_id = {$this->tblName}.catalog_currency_id
                WHERE 
                    {$this->tblName}.status != '".Constants::DELETE."'
                ");
    }
    
    public function getCourse(int $course_id = null)
    {
        if(!isset($course_id))
        {
            return false;
        }
           
        $course = $this->_getCourse($course_id);

        if(!$course)
        {
            return false;
        }

        $course['free'] = (int)($course['price']) <= 0 ? 1 : 0;
        $course['tag'] = json_decode($course['tag'],true);

        $SessionPerCourse = new SessionPerCourse;
        
        $course['sessions'] = $SessionPerCourse->getList($course_id);

        foreach($course['sessions'] as $key => $lesson)
        {
            if ($lesson['catalog_multimedia_id'] === 5) { // module
                $subLessons = $SessionPerCourse->getList($course_id,$lesson['session_per_course_id']);
                $course['sessions'][$key]['sessions'] = $subLessons;
            }
        }

        return $course;
    }
    
    public function _getCourse(int $course_id = null)
    {
        if(!isset($course_id))
        {
            return false;
        }
        
        return $this->connection()->row("SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.title,
                        {$this->tblName}.description,
                        {$this->tblName}.price,
                        {$this->tblName}.create_date,
                        {$this->tblName}.target,
                        {$this->tblName}.status,
                        {$this->tblName}.tag,
                        {$this->tblName}.image,
                        {$this->tblName}.duration,
                        {$this->tblName}.catalog_course_id,
                        {$this->tblName}.catalog_currency_id,
                        {$this->tblName}.user_support_id,
                        {$this->tblName}.catalog_course_type_id,
                        catalog_currency.currency,
                        catalog_course.name,
                        catalog_course_type.type,
                        user_support.names
                    FROM 
                        {$this->tblName}
                    LEFT JOIN 
                        catalog_course
                    ON
                        catalog_course.catalog_course_id = {$this->tblName}.catalog_course_id
                    LEFT JOIN 
                        catalog_course_type
                    ON
                        catalog_course_type.catalog_course_type_id = {$this->tblName}.catalog_course_type_id
                    LEFT JOIN 
                        user_support
                    ON
                        user_support.user_support_id = {$this->tblName}.user_support_id
                    LEFT JOIN 
                        catalog_currency
                    ON
                        catalog_currency.catalog_currency_id = {$this->tblName}.catalog_currency_id
                    WHERE 
                        {$this->tblName}.status != '".Constants::DELETE."'
                    AND 
                        {$this->tblName}.course_id = '{$course_id}'
                    ");
    }
}
