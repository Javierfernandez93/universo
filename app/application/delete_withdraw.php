<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($UserSupport->hasPermission('delete_commission') === true) 
    {
        if($data['withdraw_per_user_id'])
        {
            $WithdrawPerUser = new Site\WithdrawPerUser;
            
            if($WithdrawPerUser->loadWhere('withdraw_per_user_id = ?',$data['withdraw_per_user_id']))
            {
                if(recoverMoney([
                    'user_login_id' => $WithdrawPerUser->user_login_id,
                    'totalAmount' => $data['totalAmount']
                ]))
                {
                    $data['status'] = Site\WithdrawPerUser::DELETED;

                    $WithdrawPerUser->status = $data['status'];
                
                    if($WithdrawPerUser->save())
                    {
                        $data["s"] = 1;
                        $data["r"] = "DATA_OK";
                    } else {
                        $data["s"] = 0;
                        $data["r"] = "NOT_SAVE";
                    }
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_RECOVER";
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
            'withdraw_per_user_id' => $data['withdraw_per_user_id'],
            'unix_date' => time(),
        ],Wise\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}


function recoverMoney(array $data = null) 
{
    if($ReceiverWallet = BlockChain\Wallet::getWallet($data['user_login_id']))
    {
        if($data['totalAmount'])
        {
            $Wallet = BlockChain\Wallet::getWallet(BlockChain\Wallet::MAIN_EWALLET);

            if($transaction_per_wallet_id = $Wallet->createTransaction($ReceiverWallet->public_key,$data['totalAmount'],BlockChain\Transaction::prepareData(['@optMessage'=>'Devolución']),true))
            {
                return $transaction_per_wallet_id;
            } 
        } 
    } 
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 