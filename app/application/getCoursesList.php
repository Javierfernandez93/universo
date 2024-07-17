<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if(!$UserLogin->logged && !$UserSupport->logged) {
    unauthorized();
}

$Course = new Site\Course;
$Course->connection()->stmtQuery("SET NAMES utf8mb4");

$courses = $Course->getList();

if(!$courses)
{
    error(JFStudio\Constants::RESPONSES['NOT_DATA']);
}

$courses = format(filter($courses,$UserLogin->company_id),$UserLogin->company_id);


function filter(array $courses = null,int $user_login_id = null) : array
{
    $BuyPerUser = new Site\BuyPerUser;

    return array_filter($courses,function($course) use($BuyPerUser,$user_login_id) {
        $aviable = true;
        
        // if($course['target'] != Site\Course::ALL)
        // {    
        //     $aviable = $BuyPerUser->hasPackageBuy($user_login_id,$course['target']);
        // }

        return $aviable;
    }); 
}

function format(array $courses = null,int $user_login_id = null) : array
{	
    $SessionTakeByUserPerCourse = new Site\SessionTakeByUserPerCourse;
    $UserEnrolledInCourse = new Site\UserEnrolledInCourse;
    
	return array_map(function ($course) use($SessionTakeByUserPerCourse,$UserEnrolledInCourse,$user_login_id) {
        $course['isEnrolled'] = $UserEnrolledInCourse->isEnrolled($course['course_id'],$user_login_id);

        if($course['isEnrolled'])
        {
            $course['hasLessonTaked'] = $SessionTakeByUserPerCourse->hasLessonTaked($course['course_id'],$user_login_id);
            
            if($course['hasLessonTaked'])
            {
                $course['lastCourse'] = $SessionTakeByUserPerCourse->getLastSessionTaked($course['course_id'],$user_login_id);
            }
        }

        return $course;
    },$courses);
}

success(null,[
    'courses' => $courses,
]);