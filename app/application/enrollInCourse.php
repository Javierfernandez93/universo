<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if($UserLogin->logged === true || $UserSupport->logged === true)
{	
    if($data['course_id'])
    {
        $user_login_id = $UserLogin->logged ? $UserLogin->company_id : $UserSupport->user_login_id;

        if(Site\UserEnrolledInCourse::enrollInCourse($data['course_id'],$user_login_id))
        {
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        }
    } else {
        $data['r'] = 'NOT_SESSION_TAKE_BY_USER_PER_COURSE_ID';
        $data['s'] = 1;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 