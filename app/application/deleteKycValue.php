<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if($data['user_login_id'])
    {
        if($data['catalog_kyc_id'])
        {
            if($UserSupport->deleteKycValue([
                'user_login_id' => $data['user_login_id'],
                'catalog_kyc_id' => $data['catalog_kyc_id']
            ]))
            {   
                $data['s'] = 1;
                $data['r'] = 'DATA_OK';
            } else {
                $data['s'] = 0;
                $data['r'] = 'NOT_DEKETE_KYC_VALUE';
            }
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_FIELD';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_USER_LOGIN_ID';
    }
} else {
    $data['s'] = 0;
    $data['r'] = 'NOT_FIELD_SESSION_DATA';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 