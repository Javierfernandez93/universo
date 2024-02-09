<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true) 
{
    if($data['banner_id'])
    {
        if($banner = (new Site\Banner)->findRow("banner_id = ?",[$data['banner_id']]))
        {
            $data["banner"] = $banner;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";    
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_DATA";
        } 
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_BANNER_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 