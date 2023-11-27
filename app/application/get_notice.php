<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(isset($data['notice_id']))
    {
        if($notice = (new Site\Notice)->findRow("notice_id = ? AND status != ?",[$data['notice_id'],-1]))
        {
            $data["notice"] = format($notice);
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_NOTICE";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_NOTICE_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function format(array $notice = null)
{
    if($notice['start_date'] != 0 && $notice['end_date'] != 0)
    {
        $notice['start_date'] = date("Y-m-d",$notice['start_date']);
        $notice['end_date'] = date("Y-m-d",$notice['end_date']);
        $notice['limit_dates'] = true;
    }

    return $notice;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 