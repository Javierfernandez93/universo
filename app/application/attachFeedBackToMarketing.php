<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
	if($UserSupport->hasPermission('add_marketing_image') === true)
    {
        if($data['marketing_field_per_user_id'])
		{
			if($data['feedback'])
			{
				if(Site\MarketingFieldPerUser::attachFeedBack([
					'marketing_field_per_user_id' => $data['marketing_field_per_user_id'],
					'feedback' => $data['feedback']
				]))
				{
					$data['r'] = 'DATA_OK';
					$data['s'] = 1;
				} else {
					$data['r'] = 'NOT_ATTACHED';
					$data['s'] = 0;
				}
			} else {
				$data['r'] = 'NOT_FILES_UPLOADED';
				$data['s'] = 0;
			}
		} else {
			$data['r'] = 'NOT_FILES';
			$data['s'] = 0;
		}
    } else {
        $UserSupport->addLog([
            'data' => $data,
            'unix_date' => time(),
        ],Site\LogType::INVALID_TRANSACTION_PERMISSION);

        $data['s'] = 0;
        $data['r'] = 'INVALID_PERMISSION';
    }	
} else {
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

echo json_encode($data); 