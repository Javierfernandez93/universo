<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(Site\Blog::addOrUpdate([
        'title' => $data['title'],
        'sub_title' => $data['sub_title'],
        'content' => $data['content'],
        'image' => $data['image'],
        'image_bg' => $data['image_bg'],
        'create_date' => time(),
        'user_support_id' => $UserSupport->getId(),
        'blog_category_id' => $data['blog_category_id'],
    ]))
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_SAVE_BLOG";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 