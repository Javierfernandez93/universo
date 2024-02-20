<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged) 
{
    if($entries = (new Site\Blog)->getAll())
    {
        $data["entries"] = $entries;
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