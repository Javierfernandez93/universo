<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($data['course_id'])
    {
        if($data['session_per_course_id'])
        {
            if(!(new Site\SessionTakeByUserPerCourse)->isSessionTaked($data['session_per_course_id'],$UserLogin->company_id))
            {
                if($sessionTaked = Site\SessionTakeByUserPerCourse::setSessionAsTaked([
                        'session_per_course_id' => $data['session_per_course_id'],
                        'course_id' => $data['course_id'],
                        'user_login_id' => $UserLogin->company_id
                ]))
                {
                    if(Site\UserEnrolledInCourse::setAsEnd([
                        'course_id' => $data['course_id'],
                        'user_login_id' => $UserLogin->company_id
                    ])) {
                        $data['finished'] = true;
                    }

                    $data['sessionTaked'] = $sessionTaked;
                    $data['r'] = 'DATA_OK';
                    $data['s'] = 1;
                } else {
                    $data['r'] = 'NOT_SAVE_SESSION';
                    $data['s'] = 0;
                }   
            } else {
                $data['r'] = 'ALREAD_TAKED';
                $data['s'] = 0;
            }   
        } else {
            $data['r'] = 'NOT_SESSION_PER_COURSE_ID';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_COURSE_ID';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 