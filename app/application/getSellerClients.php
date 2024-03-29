<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    $data['catalog_user_type_id'] = isset($data['catalog_user_type_id']) ? $data['catalog_user_type_id'] : Site\CatalogUserType::CLIENT;
    
    if($users = $UserLogin->getUsers($data['catalog_user_type_id']))
    {
        $data["users"] = Site\TagPerUser::getCatalogTags($users);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "DATA_ERROR";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 