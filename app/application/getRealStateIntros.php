<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(true)
{
    // if($realStates = (new Site\RealState)->allByOrdered("status = ?",[1],null,[""]))
    if($realStates = (new Site\RealState)->findAll("status = ?",[1],null,[""]))
    {
        $data["realStates"] = $realStates;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";    
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_DATA";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 