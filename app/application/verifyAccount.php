<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data['secret'])
{
    if($data['email'])
    {
        $UserLogin = new Site\UserLogin(false,false);
    
        if($UserLogin->isValidSecretForValidateEmail($data['secret'],$data['email']))
        {
            if($UserLogin->updateAsVerified([
                'secret' => $data['secret'],
                'email' => $data['email']
            ]))
            {
                if($UserLogin->loginWithMemory())
                {
                    $data["s"] = 1;
                    $data["r"] = "DATA_OK";
                } else {
                    $data["s"] = 0;
                    $data["r"] = "NOT_LOGIN_WITH_MEMORY";
                }
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_UPDATE_AS_VERIFIED";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_VALID_SECRET";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_EMAIL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_SECRET";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 