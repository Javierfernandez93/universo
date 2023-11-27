<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{	
    if((new Site\CatalogTagIntentChat)->isUnique($UserLogin->company_id,$data['tag']))
    {
        if((new Site\IntentChat)->add($data,$UserLogin->company_id))
        {
            $data['s'] = 1;
            $data['r'] = 'DATA_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'NOT_SAVE';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'ALREADY_EXISTS';
    }
} else {
	$data['s'] = 0;
	$data['r'] = "NOT_MESSAGE";
}

echo json_encode(HCStudio\Util::compressDataForPhone($data)); 