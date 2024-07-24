<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{   
    if($data['commission_per_user_id'])
    {
        if($file = (new Site\CommissionPerUser)->findField("commission_per_user_id = ? AND user_login_id = ?",[$data['commission_per_user_id'],$UserSupport->company_id],"file"))
        {
            $data['file'] = $file;
            $data["s"] = 1;
            $data["r"] = "DATA_OK";
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_FILE";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_COMMISSION_PER_USER_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 