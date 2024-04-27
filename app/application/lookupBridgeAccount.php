<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user_bridge_account_id'])
    {     
        $UserBridgeAccount = new Site\UserBridgeAccount;
        
        if($account = $UserBridgeAccount->getPending($data['user_bridge_account_id']))
        {
            $ApiSite = new Site\ApiSite;

            if($response = $ApiSite->signupUser([
                'firstname' => $account['first_name'],
                'lastname' => $account['last_name'],
                'address' => $account['address'],
                'country' => $account['country'],
                'phonenumber' => $account['phone_number'],
                'email' => $account['email'],
                'password' => $account['password'],
                'workatfinancial' => $account['workatfinancial'],
                'knowcfd' => $account['knowcfd'],
                'financiallevel' => $account['financiallevel'],
                'politicallyexposed' => $account['politicallyexposed'],
                'fully_aware_trading_not_sut' => $account['fully_aware_trading_not_sut'],
                'fully_aware_underlying_assets' => $account['fully_aware_underlying_assets'],
                'fully_aware_trading_leveraged' => $account['fully_aware_trading_leveraged'],
            ]))
            {
                if($response['s'] == 1)
                {
                    if(Site\UserBridgeAccount::setAccount($account['user_bridge_account_id'],$response['account']))
                    {
                        if(sendPush($account['user_login_id'],'Hemos dado tu cuenta en Bridge funds',Site\CatalogNotification::ACCOUNT))
                        {
                            $data['push_sent'] = true;
                        }
        
                        $data['r'] = 'DATA_OK';
                        $data['s'] = 1;
                    } else {
                        $data['r'] = 'NOT_SAVE_ACCOUNT';
                        $data['s'] = 0;
                    }
                } else {
                    $data['r'] = 'SERVER_OFF';
                    $data['s'] = 0;
                }
            } else {
                $data['s'] = 0;
                $data['r'] = "NOT_RESPONSE";
            }    
        } else {
            $data['s'] = 0;
            $data['r'] = "NOT_ACCOUNTS";
        }
    } else {
        $data['s'] = 0;
        $data['r'] = "NOT_ACCOUNTS";
    }
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

function sendPush(string $user_login_id = null,string $message = null,int $catalog_notification_id = null) : bool
{
    return Site\NotificationPerUser::push($user_login_id,$message,$catalog_notification_id,"");
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 