<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if(true)
{
    $data["stats"] = [
        'company_email' => Site\SystemVar::_getValue("company_email"),
        'social_whatsapp' => Site\SystemVar::_getValue("social_whatsapp"),
        'experience' => Site\SystemVar::_getValue("experience"),
        'real_state' => Site\SystemVar::_getValue("real_state"),
        'sales' => Site\SystemVar::_getValue("sales"),
        'families' => Site\SystemVar::_getValue("families"),
        'people' => Site\SystemVar::_getValue("people"),
        'countries' => Site\SystemVar::_getValue("countries"),
    ];
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 