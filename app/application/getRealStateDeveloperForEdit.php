<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true) 
{
    if($data['real_state_developer_id'])
    {
        if($realStateDeveloper = (new Site\RealStateDeveloper)->findRow("real_state_developer_id = ?",[$data['real_state_developer_id']]))
        {
            $data["realStateDeveloper"] = $realStateDeveloper;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";    
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        } 
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_REAL_STATE_DEVELOPER_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 