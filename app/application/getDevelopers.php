<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(true)
{
    if($developers = (new Site\RealStateDeveloper)->findAll("status != ?",[-1]))
    {
        $data["developers"] = $developers;
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