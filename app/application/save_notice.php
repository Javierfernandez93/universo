<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(Site\Notice::addOrUpdate([
        'title' => $data['title'],
        'preview' => $data['preview'],
        'description' => $data['description'],
        'create_date' => time(),
        'user_support_id' => $UserSupport->getId(),
        'start_date' => isset($data['start_date']) ? strtotime($data['start_date']) : 0,
        'end_date' => isset($data['end_date']) ? strtotime($data['end_date']) : 0,
        'catalog_priority_id' => $data['catalog_priority_id'],
        'catalog_notice_id' => $data['catalog_notice_id'],
    ]))
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_SAVE_NOTICE";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 