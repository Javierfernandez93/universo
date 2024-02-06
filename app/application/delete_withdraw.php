<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('delete_commission') === true) 
    {
        if($data['commission_per_user_id'])
        {
            $CommissionPerUser = new Site\CommissionPerUser;
            
            if($CommissionPerUser->loadWhere('commission_per_user_id = ?',$data['commission_per_user_id']))
            {
                $data['status'] = -1;

                $CommissionPerUser->status = $data['status'];
            
                if($CommissionPerUser->save())
                {
                    Site\Logger::add([
                        'table' => Site\Logger::COMMISSION_PER_USER,
                        'field' => 'status',
                        'action' => 'update',
                        'value' => '1',
                        'user_support_id' => $UserSupport->getId(),
                        'create_date' => time(),
                    ]);
                    
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_SAVE";
                }
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_WITHDRAW_PER_USER";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_WITHDRAW_PER_USER_ID";
        }
    } else {
        $UserSupport->addLog([
            'commission_per_user_id' => $data['commission_per_user_id'],
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