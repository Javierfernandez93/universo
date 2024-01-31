<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    $filter = "AND user_login.catalog_user_type_id = '".Site\CatalogUserType::CLIENT."' ";

    // user_login_id
    if($data['user_login_id'])
    {
        $filter .= " AND user_referral.referral_id = '{$data['user_login_id']}'";
    }

    if($users = $UserSupport->getUsers($filter))
    {
        $data["users"] = $users;
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