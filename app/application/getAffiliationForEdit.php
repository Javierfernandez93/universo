<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true) 
{
    if($data['affiliation_id'])
    {
        if($affiliation = (new Site\Affiliation)->findRow("affiliation_id = ?",[$data['affiliation_id']]))
        {
            $data["affiliation"] = $affiliation;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";    
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        } 
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_AFFILIATION_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 