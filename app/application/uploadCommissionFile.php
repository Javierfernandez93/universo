<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new Site\UserSupport;

if($UserSupport->logged === true)
{
    if(!empty($_FILES))
	{
        if(is_uploaded_file($_FILES['file']['tmp_name']))
		{
            $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
            
			$source_path = $_FILES['file']['tmp_name'];
			$target_path = TO_ROOT.'src/files/img/user/' .time().'.'.$ext;
            
			if(move_uploaded_file($source_path, $target_path))
			{
                $ImageResize = new JFStudio\ImageResize($target_path);
				$ImageResize->quality_jpg = 80;
				$ImageResize->resizeToWidth(520);
				
				if($ImageResize->save($target_path))
				{
					if(uploadCommissionFile($data['commission_per_user_id'],$target_path))
					{
						Site\Logger::add([
							'table' => Site\Logger::COMMISSION_PER_USER,
							'field' => 'image',
							'action' => 'add',
							'value' => $target_path,
							'user_support_id' => $UserSupport->getId(),
							'create_date' => time(),
						]);

						$data['target_path'] = $target_path.'?t='.time();
						$data['r'] = 'SAVE_OK';
						$data['s'] = 1;
					} else {
						$data['r'] = 'NOT_UPLOAD';
						$data['s'] = 0;
					}
				} else {
					$data['r'] = 'NOT_SAVE';
					$data['s'] = 0;
				}
			} else {
				$data['r'] = 'NOT_UPLOADED';
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
	$data['r'] = 'INVALID_CREDENTIALS';
	$data['s'] = 0;
}

function uploadCommissionFile(int $commission_per_user_id = null,string $image = null) : bool 
{
	$CommissionPerUser = new Site\CommissionPerUser;
	
	if($CommissionPerUser->loadWhere("commission_per_user_id = ?",$commission_per_user_id))
	{
		$CommissionPerUser->file = $image;
		$CommissionPerUser->status = Site\CommissionPerUser::PENDING_FOR_SIGNATURE;
		
		return $CommissionPerUser->save();
	}

	return false;
}


echo json_encode(HCStudio\Util::compressDataForPhone($data));  