<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();


if($data['sign_code'])
{
    if($remote_pel_sign_id = (new Site\RemotePelSign)->getRemotePelSignIdByCode($data['sign_code']))
    {
        $data["remote_pel_sign_id"] = $remote_pel_sign_id;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_REMOTE_PEL_SIGN_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_SIGN_CODE";
}

echo json_encode($data);