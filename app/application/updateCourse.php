<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$UserSupport = new Site\UserSupport;

if(!$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

$data['user_support_id'] = 1;

$course_id = Site\Course::addCourse($data);

if(!$course_id)	
{
	error('COURSE_ALREADY_EXIST');
}

success(null,[
	'course_id' => $course_id	
]);