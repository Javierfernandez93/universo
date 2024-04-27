<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getParam();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user_bridge_account_id'])
    {
        if(Site\UserBridgeAccount::attachAccount([
            'user_bridge_account_id' => $data['user_bridge_account_id'],
            'account' => $data['account']
        ]))
        {
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_UPDATE';
            $data['s'] = 0;
        }
    } else {
        $data['s'] = 0;
        $data['r'] = "NOT_USER_BRIDGE_ACCOUNT_ID";
    }
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 