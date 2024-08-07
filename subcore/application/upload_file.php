<?php define("TO_ROOT", "../../");getParamgetParamgetParamgetParam

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once TO_ROOT . "/system/core.php";

$returnData = Array();

$returnData['upload_path'] = HCStudio\Util::getVarFromPGS('upload_path');
$returnData['thumbnail_path'] = HCStudio\Util::getVarFromPGS('thumbnail_path');
$returnData['full_path'] = HCStudio\Util::getVarFromPGS('full_path');

$returnData['width'] = HCStudio\Util::getVarFromPGS('width');

/** */
if($_FILES)
{
	$upload_path = (!$returnData["full_path"]) ? $returnData["upload_path"] : TO_ROOT . $returnData["upload_path"];

	$accepted_image = array("jpg", "jpeg", "png", "gif", "image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp");

	foreach ($_FILES AS $file)
	{
		if($file["error"] == UPLOAD_ERR_OK )
		{

			$file_name = $file["name"];
			$file_type = $file["type"];
			$file_size = $file["size"];
			$file_temp = $file["tmp_name"];


			if( in_array($file_type, $accepted_image) )
			{

				$options["upload_path"] = $upload_path;
				$options["thumbnail"] = true;
				($returnData["width"]) ? $options["width"] = $returnData["width"] : null;
				$upload_file = __createResizedImage($file, $options);							
			} else {
				 move_uploaded_file($file_temp, $upload_path . $file_name);
			}

	      	$returnData["file_name"] = $upload_file;
	      	$returnData["success"] = "1";
	      	$returnData["reason"] = "UPLOAD_IMAGE_OK";
	    } else {
	      	$returnData["success"] = "0";
	      	$returnData["error"] = $file["error"];
	      	$returnData["reason"] = "DONT_UPLOAD_IMAGE";
	    }
	}

} else {
	$returnData["success"] = "0";
	$returnData["reason"] = "NOT_FILES_FOUND";
}
/** */
echo json_encode($returnData);

function __createResizedImage($image, $options)
{
	$defaults = array(
		"upload_path" => null,
        "width" => 768,
        "height" => 600,
        "max_width" => 1280,
        "max_height" => null,
        "max_file_size" => null,
        "min_file_size" => 1,
        "accept_file_types" => "/.+$/i",
        "thumbnail" => false,
        "thumbnail_values" => array(
        							"width" => 100,
        							"height" => null,
        							"max_width" => 150,
        							"max_height" => null,
        							"thumbnail_folder" => "thumbnail/"
        							),
	);

	$options = array_replace_recursive($defaults, $options);

	$image_name = $image["name"];
	$image_type = $image["type"];
	$image_size = $image["size"];
	$image_temp = $image["tmp_name"];
	$image_name_no_blanks = str_replace(" ", "", trim($image["name"]));

	$accept_file_types = array("jpg", "jpeg", "png", "gif", "image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp");

	if( !in_array($image_type, $accept_file_types) )
	{
		return false;
	}

	if(!is_dir($options["upload_path"]))
	{
		@mkdir($options["upload_path"], 0777, true);
		@mkdir($options["upload_path"] . $options["thumbnail_values"]["thumbnail_folder"] , 0777);
	}

	list($width, $height) = @getimagesize($image_temp);

	$random = mt_rand(1, 99);
	$new_image = @imagecreate($width, $height);
	$new_name = mktime() . "_" . $random . "." . strtolower(substr(strrchr($image_name, '.'), 1));

	$new_width = ($options["width"] < $options["max_width"]) ? $options["width"] : $options["max_width"];
	$new_height = ($new_width / $width) * $height;

	$thumbnail_width = ($options["thumbnail_values"]["width"] < $options["thumbnail_values"]["max_width"]) ? $options["thumbnail_values"]["width"] : $options["thumbnail_values"]["max_width"];
	$thumbnail_height = ($thumbnail_width / $width) * $height;

	/** * Fix with this
	if($width < $height)
	{
		$new_width = ($options["width"] < $options["max_width"]) ? $options["width"] : $options["max_width"];
		$new_height = ($new_width / $width) * $height;
	} else {
		$new_height = ($options["height"] < $options["max_height"]) ? $options["height"] : $options["max_height"];
		$new_width = ($new_height / $height) * $width;
	}/** */

	$resized_image = @imagecreatetruecolor($new_width, $new_height);
	$thumbnail_image = @imagecreatetruecolor($thumbnail_width, $thumbnail_height);

	switch (strtolower(substr(strrchr($image_name, '.'), 1)))
	{
		case "jpg":
		case "jpeg":
			$original_image = @imagecreatefromjpeg($image_temp);
			$image_method = "imagejpeg";
			break;
		case "gif":
			$original_image = @imagecreatefromgif($image_temp);
			$image_method = "imagegif";
			break;
		case "png":
			$original_image = @imagecreatefrompng($image_temp);
			$image_method = "imagepng";
			break;
		default:
			$image_method = null;
	}

	@imagecopyresampled($resized_image, $original_image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
	@imagecopyresampled($thumbnail_image, $original_image, 0, 0, 0, 0, $thumbnail_width, $thumbnail_height, $width, $height);
	//imagecopyresized($resized_image, $original_image, 0,0,0,0, $new_width, $new_height, $width, $height);

	switch($image_method)
	{
		case "imagejpeg":
			@imagejpeg($resized_image, $options["upload_path"] . $new_name);
			if($options["thumbnail"] == true)
			{
				@imagejpeg($thumbnail_image, $options["upload_path"] . $options["thumbnail_values"]["thumbnail_folder"] . $new_name);
			}
			break;
		case "imagegif":
			@imagegif($resized_image, $options["upload_path"] . $new_name);
			if($options["thumbnail"] == true)
			{
				@imagegif($thumbnail_image, $options["upload_path"] . $options["thumbnail_values"]["thumbnail_folder"] . $new_name);
			}
			break;
		case "imagepng":
			@imagepng($resized_image, $options["upload_path"] . $new_name);
			if($options["thumbnail"] == true)
			{
				@imagepng($thumbnail_image, $options["upload_path"] . $options["thumbnail_values"]["thumbnail_folder"] . $new_name);
			}
			break;
		default:
			$image_method = null;
	}

	@imagedestroy($resized_image);
	@imagedestroy($original_image);

	return $new_name;
}