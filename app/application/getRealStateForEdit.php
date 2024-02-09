<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true) 
{
    if($data['real_state_id'])
    {
        if($realState = (new Site\RealState)->findRow("real_state_id = ?",[$data['real_state_id']]))
        {
            $data["realState"] = $realState;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";    
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        } 
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_REAL_STATE_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 