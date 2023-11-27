<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if($UserLogin->isPasswordMatch($data['actualPassword']))
    {
        if($data['newPassword'] == $data['newPasswordAgain'])
        {
            if($UserLogin->changePassword($data['newPassword']))
            {
                $UserLogin->logout(false);

                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_CHANGE_PASSWORD";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "PASSWORDS_MISMATCH";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "PASSWORD_MISMATCH";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "INVALID_CREDENTIALS";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 