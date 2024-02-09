<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user_login_id'])
    {
        if($pages = (new Site\FollowPage)->getAll($data['user_login_id']))
        {
            $data["pages"] = $pages;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data['r'] = "DATA_ERROR";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "DATA_ERROR";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 