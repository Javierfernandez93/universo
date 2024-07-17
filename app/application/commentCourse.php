<?php define('TO_ROOT', '../../');

require_once TO_ROOT . 'system/core.php'; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;    

if($UserLogin->logged === true || $UserSupport->logged === true)
{	
    if($data['course_id'])
    {
        $data['user_login_id'] = $UserLogin->logged ? $UserLogin->getId() : $UserSupport->user_login_id;

        if(Site\CommentPerCourse::add($data))
        {
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_SAVE_RANK';
            $data['s'] = 0;
        }
    } else {
        $data['r'] = 'NOT_BROKERS';
        $data['s'] = 0;
    }
} else {
	$data['r'] = 'NOT_SESSION';
	$data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 