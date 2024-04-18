<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($realStates = (new Site\RealState)->findAll("status = ? AND main = ?",[1,1],null,['field'=>'order_id','order'=>'asc']))
{
    $data["realStates"] = $realStates;
    $data["s"] = 1;
    $data["r"] = "DATA_OK";    
} else {
    $data["s"] = 0;
    $data["r"] = "NOT_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 