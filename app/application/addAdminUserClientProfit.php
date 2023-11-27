<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";
require_once TO_ROOT . "/vendor/autoload.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{    
    if($data['user'])
    {
        if($data['user']['account'] ?? false)
        {
            if($data['user']['profit'] > 0)
            {

                $UserBridgeAccount = new Site\UserBridgeAccount;

                if($data['user']['first_name'])
                {

                    if($user_bridge_account_id = $UserBridgeAccount->getIdByAccount($data['user']['account']))
                    {
                        if($data['user_login_id'] = $UserBridgeAccount->getUserIdById($user_bridge_account_id))
                        {
                            if(isset($data['user']['balance']) && !empty($data['user']['balance']))
                            {
                                Site\UserBridgeAccount::updateBalance($user_bridge_account_id,$data['user']['balance']);
                            }
                            
                            if(!(new Site\GainPerClient)->exist($user_bridge_account_id))
                            {
                                if($gain_per_client_id = Site\GainPerClient::add([
                                    'user_bridge_account_id' => $user_bridge_account_id,
                                    'profit' => $data['user']['profit']
                                ])) {
                                    if(Site\CommissionPerUser::addMamCommission([
                                        'profit' => $data['user']['profit'],
                                        'user_login_id' => $data['user_login_id'],
                                        'gain_per_client_id' => $gain_per_client_id
                                    ]))
                                    {
                                        $data["mam_dispersed"] = true;
                                    }
            
                                    $data["s"] = 1;
                                    $data["r"] = "DATA_OK";
                                } else { 
                                    $data["s"] = 0;
                                    $data["r"] = "NOT_ADDED";
                                }
                            } else { 
                                $data["s"] = 0;
                                $data["r"] = "DISPERTION_EXIST";
                            }
                        } else { 
                            $data["s"] = 0;
                            $data["r"] = "NOT_USER_LOGIN_ID";
                        }
                    } else { 
                        $data["s"] = 0;
                        $data["r"] = "NOT_CLIENT_ID";
                    }
                } else { 
                    $data["s"] = 0;
                    $data["r"] = "NOT_USER";
                }
            } else { 
                $data["s"] = 0;
                $data["r"] = "INVALID_PROFIT";
            }
        } else { 
            $data["s"] = 0;
            $data["r"] = "NOT_ACCONT";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_USER";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);