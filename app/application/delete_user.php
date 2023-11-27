<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('delete_user') === true)
    {
        if($data['company_id'])
        {
            $UserLogin = new Site\UserLogin;
    
            if($UserLogin->loadWhere("company_id = ?",$data['company_id'])) 
            {
                $UserLogin->status = JFStudio\Constants::DELETE;
    
                if($UserLogin->save())
                {
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data['r'] = "NOT_SAVE";
                    $data['s'] = 0;    
                }
            } else {
                $data['r'] = "NOT_LOADED";
                $data['s'] = 0;    
            }
        } else {
            $data['r'] = "DATA_ERROR";
            $data['s'] = 0;
        }
    } else {
        $UserSupport->addLog([
            'company_id' => $data['company_id'],
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 