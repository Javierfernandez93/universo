<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{	
	if($courses = (new Site\Course)->getCourses())
	{ 
		$data['courses'] = format($courses);
		$data['r'] = 'DATA_OK';
		$data['s'] = 1;
	} else {
		$data['r'] = 'NOT_COURSES';
		$data['s'] = 0;
	}
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

function format(array $courses = null) : array
{	
	$LikePerCourse = new Site\LikePerCourse;
	$CommentPerCourse = new Site\CommentPerCourse;
	$VisitPerCourse = new Site\VisitPerCourse;
	$UserEnrolledInCourse = new Site\UserEnrolledInCourse;

	return array_map(function($course) use($LikePerCourse,$CommentPerCourse,$VisitPerCourse,$UserEnrolledInCourse) {
        $course['like'] = $LikePerCourse->getCount($course['course_id']);
        $course['comment'] = $CommentPerCourse->getCount($course['course_id']);
        $course['visit'] = $VisitPerCourse->getCount($course['course_id']);
        $course['user'] = $UserEnrolledInCourse->getCoutEnrolledCourses($course['course_id']);

        return $course;
    },$courses);
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 