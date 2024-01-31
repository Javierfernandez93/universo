<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;
$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true || $UserLogin->logged === true)
{
    if(isset($data['company_id']))
    {
        if(isset($data['catalog_user_type_id']))
        {
            if(Site\UserLogin::setAsUserKind([
                'user_login_id' => $data['company_id'],
                'catalog_user_type_id' => $data['catalog_user_type_id']
            ]))
            {
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data['r'] = "DATA_ERROR";
                $data['s'] = 0;
            }
        } else {
            $data['r'] = "NOT_CATALOG_USER_TYPE_ID";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_COMPANY_ID";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 