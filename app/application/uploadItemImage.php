<?php define("TO_ROOT", "../../");

require_once TO_ROOT . "system/core.php"; 

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new Site\UserLogin;

if($UserLogin->logged === true)
{
    if(!empty($_FILES))
	{
        if(is_uploaded_file($_FILES['file']['tmp_name']))
		{
            $ext = pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION);
            
			$source_path = $_FILES['file']['tmp_name'];
			$target_path = TO_ROOT.'src/files/img/items/' .time().'.'.$ext;
            
			if(move_uploaded_file($source_path, $target_path))
			{
                $ImageResize = new JFStudio\ImageResize($target_path);
				$ImageResize->quality_jpg = 80;
				$ImageResize->resizeToWidth(520);
				
				if($ImageResize->save($target_path))
				{
                    $data['target_path'] = $target_path.'?t='.time();
                    $data['r'] = 'SAVE_OK';
                    $data['s'] = 1;
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

echo json_encode(HCStudio\Util::compressDataForPhone($data));  