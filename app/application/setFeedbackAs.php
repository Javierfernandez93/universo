<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(isset($data['user_feedback_id']))
    {
        if((new Site\UserFeedback)->find($data['user_feedback_id'])->updateStatus($data['status']))
        {
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data['r'] = "DATA_ERROR";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_FEEDBACK";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 