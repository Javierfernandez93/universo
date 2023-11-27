<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(sizeof(array_filter(array_column($data['data'], 'value'))) > 0)
    {
        if(Site\MarketingFieldPerUser::update([
            'catalog_marketing_field_id' => $data['catalog_marketing_field_id'],
            'user_login_id' => $UserLogin->company_id,
            'value' => $data['data'],
        ]))
        {
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_UPDATE';
        }		
    } else {
        $data['s'] = 0;
        $data['r'] = 'NOT_DATA';
    }		
} else {
	$data['s'] = 0;
	$data['r'] = 'INVALID_CREDENTIALS';
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 