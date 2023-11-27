<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $Notice = new Site\Notice;

    if($data['notice_id'])
    {
        if(Site\Notice::addOrUpdate([
            'notice_id' => $data['notice_id'],
            'title' => $data['title'],
            'preview' => $data['preview'] ? $data['preview'] : $Notice->preview,
            'description' => $data['description'] ? $data['description'] : $Notice->description,
            'start_date' => $data['start_date'] ? strtotime($data['start_date']) : $Notice->start_date,
            'end_date' => $data['end_date'] ? strtotime($data['end_date']) : $Notice->end_date,
            'catalog_notice_id' => $data['catalog_notice_id'],
            'catalog_priority_id' => $data['catalog_priority_id'],
        ])){
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_NOTICE_ID";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_NOTICE_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 