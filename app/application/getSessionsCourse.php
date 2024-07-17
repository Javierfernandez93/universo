<?php define('TO_ROOT', '../../');

require_once TO_ROOT. "system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if($UserLogin->logged === true || $UserSupport->logged === true)
{	
    if($data['course_id'])
    {
        $SessionPerCourse = new Site\SessionPerCourse;
        
        if($sessions = $SessionPerCourse->getList($data['course_id']))
        {
            $user_login_id = $UserLogin->logged ? $UserLogin->getId() : $UserSupport->user_login_id;
            
            $data['sessions'] = format($sessions,$user_login_id);
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_SESSIONS';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_SESSION_TAKE_BY_USER_PER_COURSE_ID';
        $data['s'] = 1;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

function format(array $sessions = null,int $user_login_id = null) : array
{	
    $SessionPerCourse = new Site\SessionPerCourse;
    $SessionTakeByUserPerCourse = new Site\SessionTakeByUserPerCourse;
    
	return array_map(function ($session) use($SessionTakeByUserPerCourse,$SessionPerCourse,$user_login_id) {
        $session['sessionTaked'] = $SessionTakeByUserPerCourse->getSessionInfo($session['session_per_course_id'],$user_login_id);
        $sessions = $SessionPerCourse->getListAttach($session['session_per_course_id'],$user_login_id);
        $session['sessions'] = sizeof($session) > 0 ? $sessions : [];
        $session['hasChilds'] = $session['sessions'] != false;

        return $session;
    },$sessions);
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 