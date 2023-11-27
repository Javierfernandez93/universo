<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

if($data['sign_code'])
{
    if($data['signature'])
	{
        if(Site\RemotePelSign::attachSignature($data['sign_code'],$data['signature']))
        {
            $data['r'] = 'DATA_OK';
            $data['s'] = 1;
        } else {
            $data['r'] = 'NOT_SAVE';
            $data['s'] = 0;
        }
	} else {
		$data['r'] = 'NOT_SIGNATURE';
		$data['s'] = 0;
	}
} else {
	$data['r'] = 'NOT_SIGN_CODE';
	$data['s'] = 0;
}

echo json_encode($data); 