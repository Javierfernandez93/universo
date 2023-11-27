<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if($data['intent_chat_id'])
    {
        $IntentChat = new Site\IntentChat;

        if($IntentChat->loadWhere('intent_chat_id = ?',$data['intent_chat_id']))
        {
            $data['status'] = JFStudio\Constants::AVIABLE;
            
            $IntentChat->status = $data['status'];
            
            if($IntentChat->save())
            {
                $data['s'] = 1;
                $data['r'] = 'DATA_OK';
            } else {
                $data['s'] = 0;
                $data['r'] = 'NOT_SAVE';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_INTENT_CHAT';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_INTENT_CHAT_ID';
    }
} else {
	$data['s'] = 0;
	$data['r'] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 