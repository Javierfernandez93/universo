<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($catalogMonthFinances = (new Site\CatalogMonthFinance)->findAll("status = ?",Constants::AVIABLE))
{
    $data["catalogMonthFinances"] = $catalogMonthFinances;
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
    $data['r'] = "DATA_ERROR";
    $data['s'] = 0;
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 