<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user_login_id'])
    {
        if($data['user_name'])
        {
            if($data['password'])
            {
                if($data['url'])
                {
                    if(Site\UserTradingAccount::add($data))
                    {
                        if(Site\Exercise::setExerciseAs($data['exercise_id'],$data['status']))
                        {
                            $data["s"] = 1;
                            $data["r"] = "DATA_OK";
                        } else {
                            $data["s"] = 0;
                            $data["r"] = "NOT_UPDATE";
                        }
                    } else {
                        $data["s"] = 0;
                        $data["r"] = "NOT_SAVE";
                    }
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_URL";
                }
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_PASSWORD";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_USER_NAME";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_USER_LOGIN_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 