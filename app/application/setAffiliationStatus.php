<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission("update_affiliation"))
    {
        if($data['affiliation_id'])
        {
            if((new Site\Affiliation)->find($data['affiliation_id'])->updateStatus($data['status']))
            {
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_UPDATED";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_AFFILIATION_ID";
        }
    } else {
        $UserSupport->addLog([
            'data' => $data,
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data["s"] = 0;
        $data["r"] = "INVALID_PERMISSION";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 