<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(true)
{
    if($sign_code = Site\RemotePelSign::generateSignCode())
    {
        $data["sign_code"] = $sign_code;
        $data["url"] = HCStudio\Connection::getMainPath()."/apps/lpoa/sign?s=".$sign_code;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_PID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);