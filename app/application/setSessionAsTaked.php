<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if(!$UserLogin->logged && !$UserSupport->logged)
{
    unauthorized();
}

$data = HCStudio\Util::getHeadersForWebService();

if(!$data['session_per_course_id'])
{
    error(Constants::RESPONSES['NOT_PARAM']);
}

if(!$data['course_id'])
{
    error(Constants::RESPONSES['NOT_PARAM']);
}

$user_login_id = $UserLogin->logged ? $UserLogin->getId() : $UserSupport->user_login_id;
    
if((new Site\SessionTakeByUserPerCourse)->isSessionTaked($data['session_per_course_id'],$user_login_id))
{
    error('ALREADY_TAKED');
}

$sessionTaked = Site\SessionTakeByUserPerCourse::setSessionAsTaked([
    'session_per_course_id' => $data['session_per_course_id'],
    'course_id' => $data['course_id'],  
    'user_login_id' => $user_login_id
]);

if(!$sessionTaked)
{
    error('NOT_SAVE_SESSION');
}

success(null,[
    'sessionTaked' => $sessionTaked
]);